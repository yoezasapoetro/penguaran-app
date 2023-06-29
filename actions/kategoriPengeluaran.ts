export const fetchKategoriPengeluaran = (): Promise<{ data: KategoriPengeluaran[], total: number }> =>
    fetch("/api/category", {
        credentials: "same-origin",
        mode: "cors",
    }).then(resp => resp.json())

export const addKategoriPengeluaran = (payload: Partial<KategoriPengeluaran>): Promise<{ data: KategoriPengeluaran, status: string }> =>
    fetch("/api/category", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "same-origin",
        mode: "cors",
    }).then(resp => resp.json())

export const removeKategoriPengeluaran = (id: number | undefined): Promise<{ data: KategoriPengeluaran, status: string }> =>
    fetch(`/api/category/${id}`, {
        method: "DELETE",
        credentials: "same-origin",
        mode: "cors",
    }).then(resp => resp.json())

export const editKategoriPengeluaran = (payload: Partial<KategoriPengeluaran>): Promise<{ data: KategoriPengeluaran, status: string }> =>
    fetch(`/api/category/${payload.id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "same-origin",
        mode: "cors",
    }).then(resp => resp.json())

