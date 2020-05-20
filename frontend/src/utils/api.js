export async function lister(part) {
  let resp = await fetch(`/api/${part}/`);
  if (resp.ok) {
    let json = await resp.json();
    return json;
  }
}

export async function reader(part, id) {
  let resp = await fetch(`/api/${part}/${id}/`);
  if (resp.ok) {
    let json = await resp.json();
    return json;
  }
}

export async function creator(part, content) {
  let token = localStorage.getItem('token');
  let resp = await fetch(`/api/${part}/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": `Token ${token}`
    },
    body: JSON.stringify(content),
  });

  if (resp.ok) {
    let json = await resp.json();
    return json;
  }
}

export async function updater(part, id, content) {
  let token = localStorage.getItem('token');
  let resp = await fetch(`/api/${part}/${id}/`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": `Token ${token}`
    },
    body: JSON.stringify(content),
  });

  if (resp.ok) {
    let json = await resp.json();
    return json;
  }
}

export async function deleter(part, id) {
  let token = localStorage.getItem('token');
  let resp = await fetch(`/api/${part}/${id}/`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": `Token ${token}`
    },
  });
}
    