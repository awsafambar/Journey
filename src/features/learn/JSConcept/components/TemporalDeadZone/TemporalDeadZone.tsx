export const TemporalDeadZone = () => {
    try {
    //@ts-expect-error: Demonstrating TDZ error for 'a'
    console.log(a) // ReferenceError: Cannot access 'a' before initialization
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const a = 10
    } catch (error) {
        console.error('error',error)
        // Handle TDZ error for 'a'
    }


    try{
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        console.log(x) // ReferenceError: x is not defined
    } catch (error) {
        console.error(error)
    }

    try {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    console.log(b) // undefined
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment, no-var
    var b = 20
    } catch (error) {
        console.error(error)
    }


    return (
        <div>{"It is the time since when the let variable is hoisted till it is initialized. "}</div>
    )
}
