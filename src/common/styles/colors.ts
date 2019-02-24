const colors = {
  BACKGROUND: '#EAEAEF', 
  LightPink: '#FFB6C1',
  浅粉红: '#FFB6C1',
  Pink: '#FFC0CB',
  粉红: '#FFC0CB',
  Crimson: '#DC143C',
  猩红: '#DC143C',
  LavenderBlush: '#FFF0F5',
  脸红的淡紫色: '#FFF0F5',
  PaleVioletRed: '#DB7093',
  苍白的紫罗兰红色: '#DB7093',
  HotPink: '#FF69B4',
  热情的粉红: '#FF69B4',
  DeepPink: '#FF1493',
  深粉色: '#FF1493',
  MediumVioletRed: '#C71585',
  适中的紫罗兰红色: '#C71585',
  Orchid: '#DA70D6',
  兰花的紫色: '#DA70D6',
  Thistle: '#D8BFD8',
  蓟: '#D8BFD8',
  plum: '#DDA0DD',
  李子: '#DDA0DD',
  Violet: '#EE82EE',
  紫罗兰: '#EE82EE',
  Magenta: '#FF00FF',
  洋红: '#FF00FF',
  Fuchsia: '#FF00FF',
  '灯笼海棠(紫红色)': '#FF00FF',
  DarkMagenta: '#8B008B',
  深洋红色: '#8B008B',
  Purple: '#800080',
  紫色: '#800080',
  MediumOrchid: '#BA55D3',
  适中的兰花紫: '#BA55D3',
  DarkVoilet: '#9400D3',
  深紫罗兰色: '#9400D3',
  DarkOrchid: '#9932CC',
  深兰花紫: '#9932CC',
  Indigo: '#4B0082',
  靛青: '#4B0082',
  BlueViolet: '#8A2BE2',
  深紫罗兰的蓝色: '#8A2BE2',
  MediumPurple: '#9370DB',
  适中的紫色: '#9370DB',
  MediumSlateBlue: '#7B68EE',
  适中的板岩暗蓝灰色: '#7B68EE',
  SlateBlue: '#6A5ACD',
  板岩暗蓝灰色: '#6A5ACD',
  DarkSlateBlue: '#483D8B',
  深岩暗蓝灰色: '#483D8B',
  Lavender: '#E6E6FA',
  熏衣草花的淡紫色: '#E6E6FA',
  GhostWhite: '#F8F8FF',
  幽灵的白色: '#F8F8FF',
  Blue: '#0000FF',
  纯蓝: '#0000FF',
  MediumBlue: '#0000CD',
  适中的蓝色: '#0000CD',
  MidnightBlue: '#191970',
  午夜的蓝色: '#191970',
  DarkBlue: '#00008B',
  深蓝色: '#00008B',
  Navy: '#000080',
  海军蓝: '#000080',
  RoyalBlue: '#4169E1',
  皇家蓝: '#4169E1',
  CornflowerBlue: '#6495ED',
  矢车菊的蓝色: '#6495ED',
  LightSteelBlue: '#B0C4DE',
  淡钢蓝: '#B0C4DE',
  LightSlateGray: '#778899',
  浅石板灰: '#778899',
  SlateGray: '#708090',
  石板灰: '#708090',
  DoderBlue: '#1E90FF',
  道奇蓝: '#1E90FF',
  AliceBlue: '#F0F8FF',
  爱丽丝蓝: '#F0F8FF',
  SteelBlue: '#4682B4',
  钢蓝: '#4682B4',
  LightSkyBlue: '#87CEFA',
  淡蓝色: '#87CEFA',
  SkyBlue: '#87CEEB',
  天蓝色: '#87CEEB',
  DeepSkyBlue: '#00BFFF',
  深天蓝: '#00BFFF',
  LightBLue: '#ADD8E6',
  淡蓝: '#ADD8E6',
  PowDerBlue: '#B0E0E6',
  火药蓝: '#B0E0E6',
  CadetBlue: '#5F9EA0',
  军校蓝: '#5F9EA0',
  Azure: '#F0FFFF',
  蔚蓝色: '#F0FFFF',
  LightCyan: '#E1FFFF',
  淡青色: '#E1FFFF',
  PaleTurquoise: '#AFEEEE',
  苍白的绿宝石: '#AFEEEE',
  Cyan: '#00FFFF',
  青色: '#00FFFF',
  Aqua: '#00FFFF',
  水绿色: '#00FFFF',
  DarkTurquoise: '#00CED1',
  深绿宝石: '#00CED1',
  DarkSlateGray: '#2F4F4F',
  深石板灰: '#2F4F4F',
  DarkCyan: '#008B8B',
  深青色: '#008B8B',
  Teal: '#008080',
  水鸭色: '#008080',
  MediumTurquoise: '#48D1CC',
  适中的绿宝石: '#48D1CC',
  LightSeaGreen: '#20B2AA',
  浅海洋绿: '#20B2AA',
  Turquoise: '#40E0D0',
  绿宝石: '#40E0D0',
  Auqamarin: '#7FFFAA',
  '绿玉\\碧绿色': '#7FFFAA',
  MediumAquamarine: '#00FA9A',
  适中的碧绿色: '#00FA9A',
  MediumSpringGreen: '#00FF7F',
  适中的春天的绿色: '#00FF7F',
  MintCream: '#F5FFFA',
  薄荷奶油: '#F5FFFA',
  SpringGreen: '#3CB371',
  春天的绿色: '#3CB371',
  SeaGreen: '#2E8B57',
  海洋绿: '#2E8B57',
  Honeydew: '#F0FFF0',
  蜂蜜: '#F0FFF0',
  LightGreen: '#90EE90',
  淡绿色: '#90EE90',
  PaleGreen: '#98FB98',
  苍白的绿色: '#98FB98',
  DarkSeaGreen: '#8FBC8F',
  深海洋绿: '#8FBC8F',
  LimeGreen: '#32CD32',
  酸橙绿: '#32CD32',
  Lime: '#00FF00',
  酸橙色: '#00FF00',
  ForestGreen: '#228B22',
  森林绿: '#228B22',
  Green: '#008000',
  纯绿: '#008000',
  DarkGreen: '#006400',
  深绿色: '#006400',
  Chartreuse: '#7FFF00',
  查特酒绿: '#7FFF00',
  LawnGreen: '#7CFC00',
  草坪绿: '#7CFC00',
  GreenYellow: '#ADFF2F',
  绿黄色: '#ADFF2F',
  OliveDrab: '#556B2F',
  橄榄土褐色: '#556B2F',
  Beige: '#F5F5DC',
  '米色(浅褐色)': '#F5F5DC',
  LightGoldenrodYellow: '#FAFAD2',
  浅秋麒麟黄: '#FAFAD2',
  Ivory: '#FFFFF0',
  象牙: '#FFFFF0',
  LightYellow: '#FFFFE0',
  浅黄色: '#FFFFE0',
  Yellow: '#FFFF00',
  纯黄: '#FFFF00',
  Olive: '#808000',
  橄榄: '#808000',
  DarkKhaki: '#BDB76B',
  深卡其布: '#BDB76B',
  LemonChiffon: '#FFFACD',
  柠檬薄纱: '#FFFACD',
  PaleGodenrod: '#EEE8AA',
  灰秋麒麟: '#EEE8AA',
  Khaki: '#F0E68C',
  卡其布: '#F0E68C',
  Gold: '#FFD700',
  金: '#FFD700',
  Cornislk: '#FFF8DC',
  玉米色: '#FFF8DC',
  GoldEnrod: '#DAA520',
  秋麒麟: '#DAA520',
  FloralWhite: '#FFFAF0',
  花的白色: '#FFFAF0',
  OldLace: '#FDF5E6',
  老饰带: '#FDF5E6',
  Wheat: '#F5DEB3',
  小麦色: '#F5DEB3',
  Moccasin: '#FFE4B5',
  鹿皮鞋: '#FFE4B5',
  Orange: '#FFA500',
  橙色: '#FFA500',
  PapayaWhip: '#FFEFD5',
  番木瓜: '#FFEFD5',
  BlanchedAlmond: '#FFEBCD',
  漂白的杏仁: '#FFEBCD',
  NavajoWhite: '#FFDEAD',
  纳瓦霍白: '#FFDEAD',
  AntiqueWhite: '#FAEBD7',
  古代的白色: '#FAEBD7',
  Tan: '#D2B48C',
  晒黑: '#D2B48C',
  BrulyWood: '#DEB887',
  结实的树: '#DEB887',
  Bisque: '#FFE4C4',
  '(浓汤)乳脂,番茄等': '#FFE4C4',
  DarkOrange: '#FF8C00',
  深橙色: '#FF8C00',
  Linen: '#FAF0E6',
  亚麻布: '#FAF0E6',
  Peru: '#CD853F',
  秘鲁: '#CD853F',
  PeachPuff: '#FFDAB9',
  桃色: '#FFDAB9',
  SandyBrown: '#F4A460',
  沙棕色: '#F4A460',
  Chocolate: '#D2691E',
  巧克力: '#D2691E',
  SaddleBrown: '#8B4513',
  马鞍棕色: '#8B4513',
  SeaShell: '#FFF5EE',
  海贝壳: '#FFF5EE',
  Sienna: '#A0522D',
  黄土赭色: '#A0522D',
  LightSalmon: '#FFA07A',
  '浅鲜肉(鲑鱼)色': '#FFA07A',
  Coral: '#FF7F50',
  珊瑚: '#FF7F50',
  OrangeRed: '#FF4500',
  橙红色: '#FF4500',
  DarkSalmon: '#E9967A',
  '深鲜肉(鲑鱼)色': '#E9967A',
  Tomato: '#FF6347',
  番茄: '#FF6347',
  MistyRose: '#FFE4E1',
  薄雾玫瑰: '#FFE4E1',
  Salmon: '#FA8072',
  '鲜肉(鲑鱼)色': '#FA8072',
  Snow: '#FFFAFA',
  雪: '#FFFAFA',
  LightCoral: '#F08080',
  淡珊瑚色: '#F08080',
  RosyBrown: '#BC8F8F',
  玫瑰棕色: '#BC8F8F',
  IndianRed: '#CD5C5C',
  印度红: '#CD5C5C',
  Red: '#FF0000',
  纯红: '#FF0000',
  Brown: '#A52A2A',
  棕色: '#A52A2A',
  FireBrick: '#B22222',
  耐火砖: '#B22222',
  DarkRed: '#8B0000',
  深红色: '#8B0000',
  Maroon: '#800000',
  栗色: '#800000',
  White: '#FFFFFF',
  纯白: '#FFFFFF',
  WhiteSmoke: '#F5F5F5',
  白烟: '#F5F5F5',
  Gainsboro: '#DCDCDC',
  亮灰色: '#DCDCDC',
  LightGrey: '#D3D3D3',
  浅灰色: '#D3D3D3',
  Silver: '#C0C0C0',
  银白色: '#C0C0C0',
  DarkGray: '#A9A9A9',
  深灰色: '#A9A9A9',
  Gray: '#808080',
  灰色: '#808080',
  DimGray: '#696969',
  暗淡的灰色: '#696969',
  Black: '#000000',
  纯黑: '#000000'
};

export default colors;