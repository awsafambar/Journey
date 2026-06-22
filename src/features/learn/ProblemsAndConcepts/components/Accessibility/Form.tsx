import { useEffect, useMemo, useRef, useState } from "react";

export const Form = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [email, setEmail] = useState("");

  const invalidEmail = useMemo(()=>email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),[email]);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <main>
      <form>
        <h1 ref={headingRef} tabIndex={-1}>
          Accessibility form
        </h1>
        <div>
          <label htmlFor="name">Full Name</label>
        </div>
        <input type="text" required placeholder="Your name" autoFocus id="name" aria-labelledby="NameDetails" aria-required="true" />
        <p id="NameDetails">
          Please enter your full name. with special characters if any and make sure to include your middle name
          {/* ... */}
        </p>
        <div>
          <label htmlFor="email">Email Address</label>
        </div>
        <input
          type="email"
          required
          placeholder="Your email"
          id="email"
          aria-required="true"
          aria-describedby="EmailDetails" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-valid={invalidEmail ? "false" : "true"}
          />
        <p id="EmailDetails">
          Please enter a valid email address. We will use this to contact you if necessary.
          {/* ... */}
        </p>
        {invalidEmail && <p aria-live="polite" aria-atomic="false" style={{ color: 'red' }}>Please enter a valid email address. {email}</p>}
        <button type="submit">Submit form</button>
      </form>
    </main>
  );
};
