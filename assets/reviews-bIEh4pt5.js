import{d as w,r as a,j as e,L as p,c as m}from"./index-lHYLsiy8.js";const f="_reviewList_vtzwq_1",x="_singleReview_vtzwq_5",g="_reviewAuthor_vtzwq_14",t={reviewList:f,singleReview:x,reviewAuthor:g};function _(){const{movieId:n}=w(),[r,d]=a.useState([]),[o,c]=a.useState(!1),v="We don't have any reviews for this movie.";return a.useEffect(()=>{async function s(){const u=`https://api.themoviedb.org/3/movie/${n}/reviews?language=en-US&api_key=d45c591dd3ef2fb9c22b9964b5ee2547`;c(!0);try{const h=(await m.get(u)).data.results.map(i=>({author:i.author,content:i.content,reviewId:i.id}));d(h)}catch(l){console.error("Wystąpił błąd podczas pobierania listy gatunków:",l)}finally{c(!1)}}s()},[n]),e.jsxs("div",{children:[e.jsx("div",{className:t.loaderContainer,children:o&&e.jsx(p,{})}),r.length===0&&!o?e.jsx("div",{children:v}):e.jsx("ul",{className:t.reviewList,children:r.map(s=>e.jsxs("li",{className:t.singleReview,children:[e.jsxs("span",{className:t.reviewAuthor,children:["Author: ",s.author]}),e.jsx("span",{children:s.content})]},s.reviewId))})]})}export{_ as default};