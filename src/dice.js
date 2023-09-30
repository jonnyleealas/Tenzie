export default function dice(prop) {
  const style = prop.isHeld ? "diceIsHeld" : "dice";
  return (
    <div className={style} onClick={prop.hold}>
      {prop.number}
    </div>
  );
}
