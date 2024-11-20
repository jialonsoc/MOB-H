export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

export const formatMentions = (text, mentions) => {
    let formattedText = text;
    mentions.forEach(mention => {
        formattedText = formattedText.replace(
            `@${mention.name}`,
            `@[${mention.name}](${mention.id})`
        );
    });
    return formattedText;
};