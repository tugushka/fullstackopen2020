(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),r=t(14),c=t.n(r),s=t(2),u=t(3),i=t.n(u),l="/api/persons",m=function(){return i.a.get(l)},f=function(e){return i.a.post(l,e)},p=function(e,n){return i.a.put("".concat(l,"/").concat(n),e)},d=function(e){return i.a.delete("".concat(l,"/").concat(e))},b=function(e){var n=e.persons,t=Object(a.useState)([]),r=Object(s.a)(t,2),c=r[0],u=r[1];return o.a.createElement("div",null,o.a.createElement("p",null,"filter shown with ",o.a.createElement("input",{onChange:function(e){u(n.filter((function(n){return n.name.toLowerCase().includes(e.target.value.toLowerCase())})))}})),c.map((function(e){return o.a.createElement("p",{key:e.name},e.name," ",e.number)})))},h=t(4),E=function(e){var n=e.persons,t=e.setPersons,r=e.setNotification,c=Object(a.useState)(""),u=Object(s.a)(c,2),i=u[0],l=u[1],d=Object(a.useState)(""),b=Object(s.a)(d,2),E=b[0],g=b[1];return o.a.createElement("form",{onSubmit:function(e){e.preventDefault(),console.log("persons",n);var a=n.find((function(e){return e.name===i}));if(a)window.confirm("".concat(a.name," is already added to phonebook, replace the old number with a new one?"))&&(p(Object(h.a)(Object(h.a)({},a),{},{number:E}),a.id).then((function(){l(""),g(""),r({message:"Updated phone number of ".concat(a.name),type:"success"})})).catch((function(e){console.log("error.response from update",e.response),r({message:e.response.data.error,type:"error"})})),m().then((function(e){return t(e.data)})));else{var o={name:i,number:E};console.log("Creating",o),f(o).then((function(e){console.log(e.data),l(""),g(""),r({message:"Added ".concat(o.name),type:"success"})})).catch((function(e){console.log("error.response",e.response),r({message:e.response.data.error,type:"error"})})),m().then((function(e){return t(e.data)}))}}},"name: ",o.a.createElement("input",{onChange:function(e){l(e.target.value)},value:i}),"number: ",o.a.createElement("input",{onChange:function(e){g(e.target.value)},value:E}),o.a.createElement("button",{type:"submit"},"add"))},g=function(e){var n=e.person,t=e.setPersons,a=e.setNotification;return o.a.createElement("div",null,o.a.createElement("p",null,n.name," ",n.number," ",o.a.createElement("button",{onClick:function(e){window.confirm("Delete ".concat(n.name,"?"))&&(console.log("Deleting",n),d(n.id).then((function(){a({message:"Deleted ".concat(n.name),type:"success"}),setTimeout((function(){return a(null)}),5e3)})).catch((function(e){a({message:"Error occured while deleting ".concat(n.name),type:"error"}),setTimeout((function(){return a(null)}),5e3)})),m().then((function(e){t(e.data)})))}},"delete")))},v=function(e){var n=e.persons,t=e.setPersons,a=e.setNotification;return o.a.createElement("div",null,n.map((function(e){return o.a.createElement(g,{key:e.name,person:e,setPersons:t,setNotification:a})})))},w=(t(37),function(e){var n=e.notification,t=e.setNotification;return null==n?o.a.createElement(o.a.Fragment,null):(setTimeout((function(){return t(null)}),5e3),o.a.createElement("div",{className:n.type},n.message))}),j=function(){var e=Object(a.useState)([]),n=Object(s.a)(e,2),t=n[0],r=n[1],c=Object(a.useState)(null),u=Object(s.a)(c,2),i=u[0],l=u[1];return Object(a.useEffect)((function(){m().then((function(e){console.log(e),r(e.data)}))}),[]),o.a.createElement("div",null,o.a.createElement("h2",null,"Phonebook"),o.a.createElement(w,{notification:i,setNotification:l}),o.a.createElement(b,{persons:t}),o.a.createElement("h3",null,"Add a new"),o.a.createElement(E,{persons:t,setPersons:r,setNotification:l}),o.a.createElement("h3",null,"Numbers"),o.a.createElement(v,{persons:t,setPersons:r,setNotification:l}))};c.a.render(o.a.createElement(j,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.a90bc21e.chunk.js.map