const urlBase: string | undefined = process.env.NEXT_BASE_URL;

export async function fetchGet(url: string) {
    try {
        const response = await fetch(`${urlBase}${url}`);

        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

export async function fetchPostClient(url: string, data: any) {
    try {
        const response = await fetch(`${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

export async function fetchGetClient(url: string) {
    try {
        const response = await fetch(`${url}`);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}