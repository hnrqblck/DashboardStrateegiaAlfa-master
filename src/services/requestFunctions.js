import api from "./api";

export const authenticate = async (values) => {
  let functionReturn;
  await api("/users/v1/auth/signin", {
    method: "POST",
    auth: {
      username: values.email,
      password: values.password,
    },
  })
    .then((response) => {
      functionReturn = response;
    })
    .catch((err) => {
      throw Error(err.message);
    });

  return functionReturn;
};

export const fetchUserData = async (token) => {
  const { data } = await api("/users/v1/user/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

//Adicionando essas funcões/variaveis na intenção de resgatar Json

export const fetchUserProjects = async () => {
  const { data } = await api("/projects/v1/project?size=100", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
  return data;
};

//Detalhamento de cada projeto (obtem todos os membros)
export const fetchProjectsMembers = async (token) => {
  const { data } = await api("/v1/project/", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data;
}
;
export const fetchUserInteraction = async () => {
  const { data } = await api(`/projects/v1/project/${localStorage.getItem('id')}/user-engagement`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
  return data;
};

export const fetchMapById = async (id) => {
  const {data} = await api("/projects/v1/project/" + ( id || localStorage.getItem('id')),
  {
    method: "GET", 
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
})
 return data;
};

//Detalhamento das statisticas do projeto /v1/project/{id}/statistics
export const fetchMapStatistics = async () => {
  const {data} = await api("/projects/v1/project/"+localStorage.getItem('id')+"/statistics",
  {
    method: "GET", 
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
})
 return data;
};

//Detalhamento das statisticas do projeto NA PAGINA DE COMPARAÇÕES AVANÇADAS
export const fetchMapStatisticsComp = async (idJourney) => {
  const {data} = await api("/projects/v1/project/"+idJourney+"/statistics",
  {
    method: "GET", 
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
})
 return data;
};

export const fetchProjectById = async () => {
  const {data} = await api(`/projects/v1/project/${localStorage.getItem('id')}`,
  {
    method: "GET", 
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
})
 return data;
};



export const getSummaryProjectsByUser = async () => {
  const {data} = await api("/projects/v1/project/summary?size=100",
  {
    method: "GET", 
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
})
 return data;
};

export const getDivergencePointEngagement = async () => {
  const {data} = await api(`/projects/v1/project/${localStorage.getItem('id')}/divergence-point-engagement`,
  {
    method: "GET", 
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
})
 return data;
};


export const getCommentsGroupedByQuestionReport = async (id) => {
  const {data} = await api(`/projects/v1/divergence-point/${id}/comment/report`,
  {
    method: "GET", 
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
})
 return data;
};





//O Id abaixo /projects/v1/map/ >> 61a135358d09f1002bfaa2f4 <</divergence-point
//veio da requisição fetchMapById, fica localizado em maps[indice].id
export const getAllDivergencePointsByMapId = async (mapId) => {
  const {data} = await api(`/projects/v1/map/${mapId}/divergence-point`,
  {
    method: "GET", 
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
})
 return data;
};

//MapId
//O Id abaixo /projects/v1/divergence-point/ >> 61b8a0f12f64c2239f995dd5 << /comment/report
//veio da requisição anterior, fica localizado em content.id
// export const getCommentsGroupedByQuestionReport = async () => {
//   const {data} = await api(`/projects/v1/divergence-point/61b8a0f12f64c2239f995dd5/comment/report`,
//   {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//   },
// })
//  return data;
// };



export const fetchMapStatisticsHome = async (token, id) => {
  const {data} = await api(`/projects/v1/project/${id}/statistics`,
  {
    method: "GET", 
    headers: {
      Authorization: `Bearer ${token}`,
  },
})
 return data;
};


export const fetchEncounterByMaps = async (token) => {
  const {data} = await api("/projects/v1/map/60e481ef9692e14e21c51262",
  {
    method: "GET", 
    headers: {
      Authorization: `Bearer ${token}`,
  },
})
 return data;
};

//const tdsEncontros = MapsData.filter( e => e.points); filter dos dados


export const fetchUserGetProjectById = async (token) => {
  const { data } = await api("/projects/v1", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(res=>{console.log(res.data)});
  return data;
  
};

//New const for projects/v1/project/60e481ee9692e14e21c51261

export const fetchUserEncouters = async (token) => {
  const { dataKit } = await api("/projects/v1", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return dataKit;
};


export const createKit = async (values, token) => {
  const response = await api("/kits/v1/kit", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      title: values.title,
      description: "trending topic do twitter",
      tier: "CUSTOM",
      type: "LEARNING",
      questions: values.questions,
      references: values.references,
    },
  });
  return response;
};
