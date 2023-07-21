import { useToast } from '@chakra-ui/react'

function PositionExample() {
    const toast = useToast()
    return (
      <Wrap>
          <WrapItem key={i}>
            <Button
              onClick={() =>
                toast({
                  title: `top-right toast`,
                  position: 'top-right',
                  isClosable: true,
                })
              }
            >
              Show {position} toast
            </Button>
          </WrapItem>
      </Wrap>
    )
  }