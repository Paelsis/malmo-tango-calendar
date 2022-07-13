// import Dance from '../images/dance.png';

  
  const stylesByCompany = [
    {
      searchString:'DANIEL',
      // style:{color:"yellow", backgroundImage: `url(${Dance})`},  
      style:{color:"#ffe2e6", background: 'linear-gradient(-45deg, #81185B 0%, green 100%'}
    },
    {
      searchString:'TANGOKOMPANIET',
      // style:{color:"yellow", backgroundImage: `url(${Dance})`},  
      style:{color:"#ffe2e6", background: 'linear-gradient(-45deg, #81185B 0%, green 100%'}
    },
    {
      searchString:'HOMERO',
      style:{backgroundColor:'#ffff62', color:'red', fontWeight:900, fontSize:18}
    },
    {
      searchString:'MARCELA',
      style:{backgroundColor:'brown', color:'yellow'},
    },  
    {
      searchString:'IVAN',
      style:{backgroundColor:'teal', color:'yellow'},
    },  
    {
      searchString:'MICAEL',
      style:{backgroundColor:'#e26e0e'},
    },
    {
      searchString:'CAMARIN',
      style:{background: 'linear-gradient(-45deg, #BB0000 0%, black 100%'},
    },
    {
      searchString:'ARRIBA',
      //style:{backgroundColor:'green'},
      style:{color:"#ffe2e6", background: 'linear-gradient(-45deg, #301939 0%, #5491c8 100%'}
    },
    {
      searchString:'URBANA',
      style:{backgroundColor:'green', color:'lightYellow'},
    },
    {
      searchString:'DEFAULT',
      style:{backgroundColor:'#52307c'},
    }
  ]
    
  export default (title, description) => {
    let found = stylesByCompany.find(it => title.toUpperCase().indexOf(it.searchString.toUpperCase()) > -1)
    found = found?found:stylesByCompany.find(it => description.toUpperCase().indexOf(it.searchString.toUpperCase()) > -1)
    const style = found?found.style:stylesByCompany[stylesByCompany.length-1].style
    return {...style, padding:2}
  }

