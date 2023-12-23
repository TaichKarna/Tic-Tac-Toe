//gameboard an IIFe to create and manipulate gameboard

const gameBoard = (function()
{
    const board = [];

    const occupied = [];

    const setOccupied = () => {
        for(let i = 0 ; i <= 9; i++)
            {
                occupied[i] = false;
            } 
    };
    
    const setBoard = () => {
    for(let i = 0 ; i < 9; i++)
    {
        board[i] = i + 1;
    }
    };

    setBoard();
    setOccupied();

    const getBoard = () => board;
    const getOccupied = () => occupied;


    const updateBoard = (positon,player) =>
    {
        if(board[positon]!=="X" || board[positon]!=="0")
        {
            board[positon] = player;
        }

    }

    const printBoard = () => {
        console.log(board[0],board[1],board[2]);
        console.log(board[3],board[4],board[5]);
        console.log(board[6],board[7],board[8]);

    }

    return {getBoard,printBoard,updateBoard,getOccupied,setBoard,setOccupied}
})();


function gameController(playerOne = "X" , playerTwo = "0")
{
    const board = gameBoard.getBoard();
    const occupied = gameBoard.getOccupied();

    let winnerFound = false;
    let winnerName = "";

    let activePlayer = playerOne;

    const switchPlayerTurn = () =>
    {
        activePlayer = activePlayer == playerOne?playerTwo:playerOne;
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () =>
    {
        gameBoard.printBoard();
        console.log(`${getActivePlayer()} turn`);
    };

    const getWinner = () => winnerFound;

    const getWinnerName = () => winnerName;

    const setWinner = () => {winnerFound = false; console.log(winnerFound)};

    const validMove = (move) =>   
    {
       if(occupied[move])
       {
            return false;
       }
       occupied[move] = true;

       return true;
    };

    const playRound = (move,target) => {

        gameBoard.updateBoard(move,activePlayer);

        target.textContent =  `${activePlayer}`;
        

        if( ( (board[0]===board[1]) && (board[1]===board[2]) ) ||
        ( (board[3]===board[4]) && (board[4]===board[5]) ) ||
        ( (board[6]===board[7]) && (board[7]===board[8]) ) ||
        ( (board[0]===board[3]) && (board[3]===board[6]) ) ||
        ( (board[1]===board[4]) && (board[4]===board[7]) ) ||
        ( (board[2]===board[5]) && (board[5]===board[8]) ) ||
        ( (board[0]===board[4]) && (board[4]===board[8]) ) ||
        ( (board[2]===board[4]) && (board[4]===board[6]) ) 
        )
        {
            
            winnerFound = true;
            winnerName = activePlayer;
            return;
        }
        else

        {   
            let notDraw = board.every((element) => {
                return (element === "X" ) || (element === "0") });

            if(!notDraw)
            {
                switchPlayerTurn();
                printNewRound();
            }
        }
        
    }

    return {getWinnerName,playRound,getActivePlayer,getWinner,setWinner,validMove};
}

const screenController = () =>
{   
    const gameControl = gameController("X","0");

    const board = document.querySelector(".board");
    const display = document.querySelector(".display");
    const restart = document.querySelector(".restart");

    board.addEventListener('click',(event)=>
    {
        const move = event.target.id;

        if((!gameControl.getWinner()) &&  gameControl.validMove(move-1))
        {  
            gameControl.playRound(move-1,event.target);
            display.textContent = `Player ${gameControl.getActivePlayer()} Turn`; 
        }
        
        if(gameControl.getWinner())
        {
            display.textContent = `Player ${gameControl.getWinnerName()} won `
        }

    });
   
    restart.addEventListener('click',(event)=>
    {
        gameBoard.setBoard();
        gameBoard.setOccupied();
        gameControl.setWinner();
        display.textContent = `Player X's turn`
        
        if(board.hasChildNodes())
        {
            board.childNodes.forEach((e)=>
            {
                e.textContent = "";
            });
        }
        
    });
}

screenController();
