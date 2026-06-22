import { useState, useMemo } from "react"

type Priority = "high" | "medium" | "low";

type Todo = {
    text: string;
    isCompleted: boolean;
    priority: Priority;
};

// Priority order for sorting (high first, then medium, then low)
const priorityWeight: Record<Priority, number> = {
    high: 1,
    medium: 2,
    low: 3
};

export const TodoList = () => {
    const [text, setText] = useState<string>('')
    const [priority, setPriority] = useState<Priority>("medium")
    const [todos, setTodos] = useState<Record<string, Todo>>({})

    const handleAddTodo = () => {
        const key = text.toLowerCase()
        if (Object.hasOwn(todos, key))
            return

        const newTodo = {
            text,
            isCompleted: false,
            priority
        }

        setTodos(prevTodos => ({
            ...prevTodos,
            [key]: newTodo
        }))
        setText("")
        setPriority("medium") // Reset to default
    }

    const handleDeleteTodo = (key: string) => {
        const newTodo = { ...todos }
        delete newTodo[key]
        setTodos(newTodo)
    }

    const handleCheckBoxToggle = (key: string) => {
        setTodos(prevTodo => ({
            ...prevTodo,
            [key]: {
                ...prevTodo[key],
                isCompleted: !(prevTodo[key].isCompleted)
            }
        }))
    }

    const handlePriorityChange = (key: string, newPriority: Priority) => {
        setTodos(prevTodo => ({
            ...prevTodo,
            [key]: {
                ...prevTodo[key],
                priority: newPriority
            }
        }))
    }

    // Memoized sorted todos - only recalculates when todos change
    const sortedTodos = useMemo(() => {
        return Object.entries(todos)
            .sort(([, todoA], [, todoB]) => {
                // Sort by priority weight (lower number = higher priority)
                return priorityWeight[todoA.priority] - priorityWeight[todoB.priority];
            })
            .map(([key]) => key); // Return just the keys in sorted order
    }, [todos]);

    return (
        <div style={{ padding: "20px" }}>
            <div style={{ marginBottom: "20px" }}>
                <input 
                    type="text" 
                    value={text} 
                    onChange={(e) => setText(e.target.value)} 
                    placeholder="Enter Todo" 
                    style={{ border: "1px solid black", marginRight: "10px", padding: "5px" }} 
                />
                
                <select 
                    value={priority} 
                    onChange={(e) => setPriority(e.target.value as Priority)}
                    style={{ border: "1px solid black", marginRight: "10px", padding: "5px" }}
                >
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                </select>

                <button 
                    disabled={text.trim() === ""} 
                    onClick={handleAddTodo} 
                    style={{ border: "1px solid black", backgroundColor: "grey", padding: "5px 10px" }}
                >
                    Submit
                </button>
            </div>

            <ul style={{ listStyle: "none", padding: 0 }}>
                {sortedTodos.map(key => {
                    const { isCompleted, text, priority: todoPriority } = todos[key]

                    return (
                        <li style={{
                            display: "flex",
                            gap: "10px",
                            alignItems: "center",
                            marginBottom: "10px",
                            padding: "10px",
                            backgroundColor: todoPriority === "high" ? "#ffebee" : 
                                           todoPriority === "medium" ? "#fff3e0" : "#f1f8e9",
                            border: "1px solid #ddd",
                            borderRadius: "4px"
                        }}
                            key={key}>
                            <input 
                                type="checkbox" 
                                checked={isCompleted} 
                                readOnly 
                                onChange={() => handleCheckBoxToggle(key)} 
                            />
                            
                            <span style={{ 
                                flex: 1,
                                textDecoration: isCompleted ? "line-through" : "none",
                                color: isCompleted ? "#999" : "inherit"
                            }}>
                                {text}
                            </span>

                            <select 
                                value={todoPriority} 
                                onChange={(e) => handlePriorityChange(key, e.target.value as Priority)}
                                style={{ border: "1px solid black", padding: "3px" }}
                            >
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>

                            <button 
                                onClick={() => handleDeleteTodo(key)} 
                                style={{ border: "1px solid black", backgroundColor: "Black", color: "white", padding: "5px 10px" }}
                            >
                                Delete
                            </button>
                        </li>
                    )
                })}
            </ul>

            {sortedTodos.length === 0 && (
                <p style={{ color: "#999", textAlign: "center" }}>No todos yet. Add one above!</p>
            )}
        </div>
    )
}