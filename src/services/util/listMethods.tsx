type ListItem = { [key: string]: any };
interface ExpandedItem {
    [key: string]: any;
}
    

export function filterList(list: ListItem[], keyPath: string, value: any): ListItem[] {
  return list.filter(item => {
    const keys = keyPath.split('.');
    let current = item;
    for (const key of keys) {
      if (current[key] === undefined) {
        return false;
      }
      current = current[key];
    }
    return current === value;
  });
}

export function scrubList(list: ListItem[], keyPath: string, value: any): ListItem[] {
  return list.filter(item => {
    const keys = keyPath.split('.');
    let current = item;
    for (const key of keys) {
      if (current[key] === undefined) {
        return false;
      }
      current = current[key];
    }
    return current !== value;
  });
}

export function flattenNested(list: ListItem[], keyPath: string): ListItem[] {
  return list.map(item => {
    const keys = keyPath.split('.');
    let current = item;
    for (const key of keys) {
      if (current[key] === undefined) {
        return item;
      }
      current = current[key];
    }
    return { ...item, ...current };
  });
}
  
export function ExpandThenConverge(
    list: ListItem[],
    convergeKey: string,
    expandKey: string,
    defaultValue: any = null,
    masterOverrides: { [key: string]: any } = {}
    ): ExpandedItem[] {
    const resultMap: { [expandValue: string]: ExpandedItem } = {};

    list.forEach(item => {
        const expandValue = item[convergeKey];
        const convergeValue = item[expandKey];
        const statuses = item['statuses'];

        if (!resultMap[expandValue]) {
        resultMap[expandValue] = { [convergeKey]: expandValue };
        }

        resultMap[expandValue][convergeValue] = statuses;

        Object.keys(item).forEach(key => {
        if (key !== convergeKey && key !== expandKey && key !== 'statuses') {
            resultMap[expandValue][key] = 
            resultMap[expandValue][key] || masterOverrides[key] || item[key];
        }
        });
    });

    const result = Object.values(resultMap).map(entry => {
        list.forEach(item => {
        const convergeValue = item[expandKey];
        if (!(convergeValue in entry)) {
            entry[convergeValue] = defaultValue;
        }
        });

        Object.keys(masterOverrides).forEach(key => {
        entry[key] = masterOverrides[key];
        });

        return entry;
    });

    return result;
}

export function removeKeys(list: ListItem[], keys: string[]): ListItem[] {
    return list.map(item => {
        keys.forEach(key => {
        delete item[key];
        });
        return item;
    });
}