// - divide writing page: my writing or other's writing //
// - divide writing page owner : login user or not //
// if this is my writing page and login user is the owner, set "my", if not set "name's"

export default function contentMark(
  userName: string,
  loginUserName: string,
  isMyContent: boolean,
  isWriting: boolean,
) {
  // writing or list
  const contentCategory = isWriting ? "Writing" : "List";
  // my or other's
  const myContentUserMark = userName === loginUserName ? `My` : `${userName}'s`;
  const myContentMarkText = `${myContentUserMark} ${contentCategory}`;
  // if this is other's writing page and login user is the owner, ...
  const othersContentUserMark = userName === loginUserName ? `I` : `${userName}`;
  const othersContentMarkText = `Other's ${contentCategory} ${othersContentUserMark} Like`;
  // mark the page name
  const contentPageMark = isMyContent ? myContentMarkText : othersContentMarkText;
  return contentPageMark;
}
