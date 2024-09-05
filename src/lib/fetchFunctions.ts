const urlBase: string | undefined = process.env.NEXT_BASE_URL;

export async function fetchGet(url: string) {
  const response = await fetch(`${urlBase}${url}`);

  if (!response.ok) {
    return {
      data: [],
      seccess: false,
      message: "los datos no estan disponibles en este momento",
    };
  }

  return await response.json();
}

export async function fetchPostClient(url: string, data: any) {
  const response = await fetch(`${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}

export async function fetchGetClient(url: string) {
  const response = await fetch(`${url}`);
  if (!response.ok) {
    return {
      data: [],
      seccess: false,
      message: "los datos no estan disponibles en este momento",
    };
  }
  return await response.json();
}

export async function fetchPutClient(url: string, data: any) {
  const response = await fetch(`${url}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  
  return await response.json();
}

export async function fetchDeleteClient(url: string) {
  const response = await fetch(`${url}`, {
    method: "DELETE",
  });

  return await response.json();
}
