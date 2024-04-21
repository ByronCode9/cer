/* eslint-disable react/prop-types */
function TextField(props) {
   const {type, placeholder} = props;
   return (
      <div>
         <input
            className="w-full border border-[#747474] focus:border-white/60 duration-200 outline-none bg-lightBlack rounded placeholder:text-[#939393]/90 leading-[1.4em] placeholder:text-xl py-2.5 px-3 max-w-[292px]"
            type={type}
            placeholder={placeholder}
         />
      </div>
   );
}

export default TextField;
