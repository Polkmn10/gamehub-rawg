import { Flex } from '@radix-ui/themes';

function Preloader() {
  return (
    <Flex 
      justify="center" 
      align="center" 
      style={{ 
        height: '100%',
        minHeight: '400px',
        width: '100%',
        position: 'relative',
        background: 'transparent',
        zIndex: 50,
      }}
    >
      <div className="loader">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
      </div>
    </Flex>
  );
}

export default Preloader;