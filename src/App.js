import * as React from "react";
import {
  Button,
  Container,
  Text,
  HStack,
  VStack,
  Center,
} from "@chakra-ui/react";
import useStore from "./store/zustand";

function Board() {
  const squares = useStore((state) => state.squares);
  const setSquares = useStore((state) => state.setSquares);

  const winner = useStore((state) => state.winner);
  const setWinner = useStore((state) => state.setWinner);

  const status = useStore((state) => state.status);
  const setStatus = useStore((state) => state.setStatus);

  function selectSquare(square) {
    if (!(squares[square] || winner)) {
      const squaresCopy = [...squares];
      squaresCopy[square] = calculateNextValue(squares);
      setSquares(squaresCopy);

      // check winner
      const updatedWinner = calculateWinner(squaresCopy);
      setWinner(updatedWinner);

      // update status
      const updatedStatus = calculateStatus(
        updatedWinner,
        squaresCopy,
        calculateNextValue(squaresCopy)
      );
      setStatus(updatedStatus);
    }
  }

  function renderSquare(i) {
    return (
      <Button
        colorScheme="black"
        size="xs"
        variant="outline"
        p="0px"
        onClick={() => selectSquare(i)}
      >
        {squares[i]}
      </Button>
    );
  }

  return (
    <>
      <Text
        fontFamily="sans-serif"
        fontSize="10px"
        textAlign="center"
        pb="10px"
      >
        {status}
      </Text>
      <VStack spacing="10px">
        <HStack spacing="10px">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </HStack>
        <HStack spacing="10px">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </HStack>
        <HStack spacing="10px">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </HStack>
      </VStack>
    </>
  );
}

function Game() {
  const restart = useStore((state) => state.restart);

  return (
    <div>
      <div>
        <Container
          borderRadius="5%"
          boxShadow="xl"
          w="150px"
          h="180px"
          p="10px"
          mt="20px"
        >
          <Board />
          <Center pt="10px">
            <Button
              colorScheme="black"
              size="xs"
              variant="outline"
              boxShadow="lg"
              fontSize="8px"
              onClick={restart}
            >
              Restart
            </Button>
          </Center>
        </Container>
      </div>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`;
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? "X" : "O";
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return <Game />;
}

export default App;
