// eslint-disable-next-line import/prefer-default-export
export const isPostPublic = (path) => {
    const pathParts = path.split("/");
    return !pathParts[pathParts.length - 1][0] === "_";
}