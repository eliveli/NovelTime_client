export default function contentMark(
  userName: string,
  loginUserName: string,
  isMyContent: boolean,
  isWriting: boolean,
) {
  // writing or list
  const contentCategory = isWriting ? "Writing" : "List";
  // my content : my or userName's - whether the owner of the user page is the same as login user
  const myContentUserMark = userName === loginUserName ? `My` : `${userName}'s`;
  const myContentMarkText = `${myContentUserMark} ${contentCategory}`;
  // other's content : I or userName - whether the owner of the user page is the same as login user
  const othersContentUserMark = userName === loginUserName ? `I` : `${userName}`;
  const othersContentMarkText = `Other's ${contentCategory} ${othersContentUserMark} Like`;
  // mark the page name
  const contentPageMark = isMyContent ? myContentMarkText : othersContentMarkText;
  return contentPageMark;
}
