export async function lister(part) {
  let token = localStorage.getItem('token');
  let resp = await fetch(`/api/${part}/`, {
    headers: {
      Accept: "application/json",
      Authorization: token ? `Token ${token}` : null,
    },
  });
  if (resp.ok) {
    let json = await resp.json();
    return json;
  } else {
    throw {
      response: resp,
    };
  }
}

export async function reader(part, id) {
  let token = localStorage.getItem('token');
  let resp = await fetch(`/api/${part}/${id}/`, {
    headers: {
      Accept: "application/json",
      Authorization: token ? `Token ${token}` : null,
    },
  });
  if (resp.ok) {
    let json = await resp.json();
    return json;
  } else {
    throw {
      response: resp,
    };
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
  } else {
    throw {
      response: resp,
    };
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
  } else {
    throw {
      response: resp,
    };
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

  if (!resp.ok) {
    throw {
      response: resp,
    };
  }
}
    