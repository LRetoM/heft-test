export const SpListSelectFields = {
  Lists: ['Id', 'Title', 'ItemCount', 'BaseTemplate'],
  DocumentLibraries: ['Id', 'Title', 'Description', 'DefaultViewUrl'],
  Web: ['Title', 'Url'],
  Site: ['Url', 'Id']
};

export const buildSpListFilter = (hidden: boolean, baseTemplate?: number): string => {
  let filter = `Hidden eq ${hidden}`;
  if (baseTemplate !== undefined) filter += ` and BaseTemplate eq ${baseTemplate}`;
  return filter;
};
