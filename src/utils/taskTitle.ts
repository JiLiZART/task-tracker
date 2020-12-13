export const getTaskTitle = (text: string, defaultTitle = 'New Task'): string => {
    // Remove whitespace from both ends
    // Get the first n characters
    // Remove # from the title in the case of using markdown headers in your title
    const taskText = text.trim().match(/[^#]{1,45}/);

    // Get the first line of text after any newlines
    // In the future, this should break on a full word
    return taskText ? taskText[0].trim().split(/\r?\n/)[0] : defaultTitle
};
