import "./animationFooter.scss";

const AnimatioFooter = () => {
  return (
    <div className='container'>
      <div className='coast'>
        <div className='wave-rel-wrap'>
          <div className='wave'></div>
        </div>
      </div>
      <div className='coast delay'>
        <div className='wave-rel-wrap'>
          <div className='wave delay'></div>
        </div>
      </div>

      <div className='text-wave text-wave-w'>w</div>
      <div className='text-wave text-wave-a'>a</div>
      <div className='text-wave text-wave-v'>v</div>
      <div className='text-wave text-wave-e'>e</div>
    </div>
  );
};

export default AnimatioFooter;
