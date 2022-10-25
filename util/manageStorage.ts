export interface Data {
  title: string;
  id: string;
  password: string;
}

interface StorageResult {
  status: "error" | "success";
  message: string;
}

const STORAGE_NAME = "SAI";

export const setStorage = ({ title, id, password }: Data): StorageResult => {
  const prevStorage = localStorage.getItem(STORAGE_NAME);
  if (prevStorage) {
    const prevItems: Data[] = JSON.parse(prevStorage);
    const titleMatchedItems = prevItems.filter((item) => item.title === title);
    if (titleMatchedItems.length !== 0) {
      return {
        status: "error",
        message: "this title already exist",
      };
    } else {
      const newItem = [...JSON.parse(prevStorage), { title, id, password }];
      localStorage.setItem(STORAGE_NAME, JSON.stringify(newItem));
      return {
        status: "success",
        message: "saved",
      };
    }
  } else {
    const newItem = [
      {
        title,
        id,
        password,
      },
    ];
    localStorage.setItem(STORAGE_NAME, JSON.stringify(newItem));
    return {
      status: "success",
      message: "saved",
    };
  }
};

export const getStorage = (): Data[] | null => {
  const currentStorage = localStorage.getItem(STORAGE_NAME);
  if (currentStorage) {
    const parse: Data[] = JSON.parse(currentStorage);
    return parse;
  } else {
    return null;
  }
};

export const getStorageByTitle = (title: string): Data | null => {
  const currentStorage = localStorage.getItem(STORAGE_NAME);
  if (currentStorage) {
    const parse: Data[] = JSON.parse(currentStorage);
    const targetData = parse.filter((data) => data.title === title);
    if (targetData.length === 1) {
      return targetData[0];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

export const editStorage = ({
  title,
  id,
  password,
  newTitle,
}: Data & { newTitle: string }) => {
  const currentStorage = localStorage.getItem(STORAGE_NAME);
  if (currentStorage) {
    const parse: Data[] = JSON.parse(currentStorage);
    const newArray: Data[] = parse.map((data) => {
      if (data.title === title) {
        return {
          title: newTitle,
          id,
          password,
        };
      } else {
        return data;
      }
    });
    localStorage.setItem(STORAGE_NAME, JSON.stringify(newArray));
  }
};
