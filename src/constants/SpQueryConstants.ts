export const SpListSelectFields = {
  Lists: ['Id', 'Title', 'Description', 'DefaultViewUrl', 'ItemCount', 'BaseTemplate'],
  Web: ['Title', 'Url'],
  Site: ['Url', 'Id']
};

export const SpListTemplates = {
  GenericList: 100,
  DocumentLibrary: 101
};

export const buildSpListFilter = (hidden: boolean, baseTemplate?: number): string => {
  let filter = `Hidden eq ${hidden}`;
  if (baseTemplate !== undefined) filter += ` and BaseTemplate eq ${baseTemplate}`;
  return filter;
};
