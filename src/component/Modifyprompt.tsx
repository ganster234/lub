export default function Modifyprompt(props:{advicesP:string}) {
  return (
    <div className="channeltada informationchannel w-full h-full flex flex-col justify-center items-center  ">
      <img src="/succeed.png" alt="" />
      <p className=" text-[24px] mt-6">{props.advicesP}</p>
    </div>
  );
}
