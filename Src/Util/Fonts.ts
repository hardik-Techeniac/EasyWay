import { ms, s  } from "react-native-size-matters";
import COLORS from "./Colors";
import metrics from "./Metrics";


const fontTypes = {
    base: 'poppins',
};
const size = {
    h1: s(36),
    h2: s(24),
    h3: s(20),
    medium: s(18),
    regular:s(16),
    small: s(14),
    xsmall:s(12),
    ssmall:s(10),
    error: s(10),
    tiny: s(6),
  };
  const FontStyle = {
    SSOnlyFont:{
      fontFamily: fontTypes.base,
     
  },
    SSinputTitle:{
        fontFamily: fontTypes.base,
        fontSize: size.xsmall,
        color:'#6D6D78',
    },
    SSinputText: {
        fontFamily: fontTypes.base,
        fontSize: size.xsmall,
        margin:15
      },
    SSBtntitle:{
        fontFamily: fontTypes.base,
        fontSize: size.medium,
        fontWeight:metrics.FontTitle,
        alignSelf:'center',
        justifyContent:'center',
        lineHeight:56,
        color:COLORS.white
    },
    SSCreateAccount:{
      fontFamily: fontTypes.base,
        fontSize: size.small,
        fontWeight:'400',
    },
    SSLoginTitle:{
      fontFamily: fontTypes.base,
      fontSize: size.h2,
      color:COLORS.black,
    },
    SSLoginSubTitle:{
      fontFamily: fontTypes.base,
      fontSize: size.small,
      color:COLORS.LoginsubTitle
    },
    SSmallFont:{
      fontFamily: fontTypes.base,
      fontSize: s(size.xsmall),
    },
    SSmallError:{
      fontFamily: fontTypes.base,
      fontSize: size.xsmall,
      color:COLORS.red,
      marginTop:5
    },
    SSHomeName:{
      fontFamily: fontTypes.base,
      fontSize: ms(18),
      color:COLORS.black,
    },
    SSCourceTitle:{
      fontFamily: fontTypes.base,
      fontSize: 22,
      color:COLORS.black,
    },
    courseListName:{
      fontFamily: fontTypes.base,
      fontSize: 14 ,
      color:COLORS.black,
    },
    SScreenMainTitle:{
      fontFamily: fontTypes.base,
      fontSize: 20,
      color:COLORS.black,
    }
  }


  export default {fontTypes,size,FontStyle}

