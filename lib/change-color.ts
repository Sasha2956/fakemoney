export const changeColor = (color: string, amount: number) => {
  // #FFF not supportet rather use #FFFFFF
  const clamp = (val: number) => Math.min(Math.max(val, 0), 0xff);
  const fill = (str: string) => ("00" + str).slice(-2);

  const num = parseInt(color.substr(1), 16);
  const red = clamp((num >> 16) + amount);
  const green = clamp(((num >> 8) & 0x00ff) + amount);
  const blue = clamp((num & 0x0000ff) + amount);
  return (
    "#" +
    fill(red.toString(16)) +
    fill(green.toString(16)) +
    fill(blue.toString(16))
  );
}
