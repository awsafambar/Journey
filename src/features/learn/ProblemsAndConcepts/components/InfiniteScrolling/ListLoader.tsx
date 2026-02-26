import { useCallback, useEffect, useRef, useState } from "react";

type Book = {
    key: string;
    title: string;
};

function ListLoader() {
    const [list, setList] = useState<Book[]>([]);
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState("");
    const buffer = 200;

    const abortSignalController = useRef<AbortController | null>(null);
    const isFetchingRef = useRef(false);
    const lastQueryRef = useRef(query);


    // Reset pagination when query changes
    useEffect(() => {
        if (abortSignalController.current) {
            abortSignalController.current.abort();
            abortSignalController.current = null;
        }

        setList([]);
        setPage(1);
        setHasMore(true);
        setError("");
        lastQueryRef.current = query.trim();
    }, [query]);


    // Fixed scroll handler - calculates values inside the function
    const handleScroll = useCallback(() => {
        if (loading || !hasMore || isFetchingRef.current) return;

        const scrollPosition = window.scrollY;
        const totalVisibleArea = window.innerHeight;
        const totalHeight = document.documentElement.scrollHeight;
        const aboutScrollBottom = scrollPosition + totalVisibleArea >= totalHeight - buffer;
        if (aboutScrollBottom) {
            setPage((prev) => prev + 1);
        }
    }, [hasMore, loading]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    const fetchData = useCallback(async () => {
        // Don't fetch if loading, no more data, or query is empty
        if (isFetchingRef.current || !hasMore || query.trim() === "") return;

        if (abortSignalController.current) {
            abortSignalController.current.abort();
        }

        setLoading(true);
        setError("");

        try {
            // Encode the query to handle special characters
            const encodedQuery = encodeURIComponent(query.trim());
            abortSignalController.current = new AbortController()
            const response = await fetch(
                `https://openlibrary.org/search.json?q=${encodedQuery}&page=${page}`,
                { signal: abortSignalController.current.signal }
            );
            const data = await response.json();

            // Check if we got results
            if (lastQueryRef.current === query) {
                if (data.docs && data.docs.length > 0) {
                    // Fix: Spread the array properly
                    setList((prevData) => [...prevData, ...data.docs]);
                    setHasMore(data.docs.length > 0);
                } else {
                    setHasMore(false);
                }
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Failed to load data. Please try again.");
        } finally {
            setLoading(false);
            isFetchingRef.current = false
            abortSignalController.current = null;
        }
    }, [query, page, hasMore]); // Only depends on query and page

    useEffect(() => {
        fetchData();
        return () => {
            if (abortSignalController.current) {
                abortSignalController.current.abort();
            }
        }
    }, [fetchData]); // Remove hasMore and loading from dependencies


    return (
        <>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for books..."
                className="border p-2 mb-4 w-full"
            />
            {loading && page === 1 && <div>Loading...</div>}
            {error && <div className="text-red-500">{error}</div>}
            {list.map((book) => (
                <div key={book.key}>{book.title}</div>
            ))}
            {loading && page > 1 && <div>Loading more...</div>}
            {!hasMore && list.length > 0 && <div>No more books</div>}
        </>
    );
}

export default ListLoader;