const isOnAppClicked = (event) => {
    event.stopPropagation();
    return (
        event.target.tagName !== "svg" &&
        event.target.tagName !== "path" &&
        !event.target.className.includes("dateChoice") &&
        !event.target.className.includes("profile")
    );
};

export default isOnAppClicked;
