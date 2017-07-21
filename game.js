
      var canvas, ctx, keystate, frames, score, grid, lastMove, currentMove;
      var GAME_OVER = false;
      var GRID_SIZE = 4;
      var CELL_PIXELS = 100;
      var FONT_NAME = "Arial";
      var TILE_FONT_STR = Math.floor(CELL_PIXELS / 2) + "px " + FONT_NAME;
      var GAME_OVER_FONT_STR = 50 + "px " + FONT_NAME;
      //cell values
      var EMPTY = 0, TILE = 1;
    //Direction values
      var LEFT=0, UP=1, RIGHT=2, DOWN=3;
    // KEY CODES
      var KEY_LEFT=37, KEY_UP=38, KEY_RIGHT=39, KEY_DOWN=40;

      function init(){
        console.log("init()");
        console.log("tile font -> " + TILE_FONT_STR);
        score = 0;
        grid =  new Grid(GRID_SIZE);
      }

      function update(){
        //frames++;
        if  (keystate[KEY_LEFT]) currentMove = LEFT;
        if  (keystate[KEY_RIGHT]) currentMove = RIGHT;
        if  (keystate[KEY_UP]) currentMove = UP;
        if  (keystate[KEY_DOWN]) currentMove = DOWN;

        //look for discrete key presses
        if (currentMove != null && lastMove != currentMove){
          switch (currentMove) {
            case UP:
              console.log("up");
              grid.moveUp();
              lastMove = UP;
              break;
            case DOWN:
              console.log("down");
              grid.moveDown();
              lastMove = DOWN;
              break;
            case LEFT:
              console.log("left") ;
              grid.moveLeft();
              lastMove = LEFT;
              break;
            case RIGHT:
              console.log("right");
              grid.moveRight();
              lastMove = RIGHT;
              break;
            default:
          }
          if (grid.getEmptyCells().length >= 1){
            grid.insertRandom();
            grid.unsetMergeFlag();
          }else{
            GAME_OVER = true;
          }
        }
      }

      function draw(){
        var tileWidth = canvas.width/grid.size;
        var tileHeight = canvas.height/grid.size;
        for(var col=0; col < grid.size; col++){
          for (var row=0; row < grid.size; row++){
            var cell = grid.getCell(col,row);
            var cellValue = cell instanceof Tile ? cell.getValue() : 0;
            var cellText = cell instanceof Tile ? cell.getValue() : "";
//            var cellText = cell instanceof Tile ?"";
            switch (cellValue){
              case EMPTY:
                ctx.fillStyle = "#fff";
                break;
              case 4:
                ctx.fillStyle = "#33cc99";
                break;
              case 8:
                ctx.fillStyle = "#009900";
                break;
              case 16:
                ctx.fillStyle = "#999966";
                break;
              case 32:
                ctx.fillStyle = "#6666cc";
                break;
              case 64:
                ctx.fillStyle = "#330099";
                break;
              case 128:
                ctx.fillStyle = "#9900ff";
                break;
              case 256:
                ctx.fillStyle = "#ff00ff";
                break;
              case 512:
                ctx.fillStyle = "#ff6666";
                break;
              case 1024:
                ctx.fillStyle = "#ff6633";
                break;
              case 2048:
                ctx.fillStyle = "#ffff00";
                break;
              default:
                ctx.fillStyle = "#0ff";
                //cellText = cell.getValue();
                break;
            }
            ctx.fillRect(col*tileWidth, row*tileHeight, tileWidth, tileHeight);

            //set font color, style, alignment
            ctx.fillStyle = "#585858";
            ctx.font = TILE_FONT_STR;
            ctx.textAlign = "center";

            // tile text is aligned to the center for vertical, and with the middle third horizontally.
            // the vertical axis can be center aligned, the horizontal can't.
            // aligning the horizontal with the middle of the tile starts the bottom of the text at half way,
            // leading to text in only the top half of the tile.

            //ctx.fillText(cellText, (row*tileWidth) + (tileWidth / 2) , (col*tileHeight) + (2 * (tileHeight / 3)));
            ctx.fillText(cellText, (col*tileWidth) + (tileWidth / 2) , (row*tileHeight) + (2 * (tileHeight / 3)));
          }
        }
      }

      function drawGameOver(){
            ctx.fillStyle = "#000000";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#ffffff";
            ctx.font = GAME_OVER_FONT_STR;
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER !!!", (canvas.width / 2) , (canvas.height / 2));
      }

      function loop(){
        if (!GAME_OVER){
          update();
          draw();
          window.requestAnimationFrame(loop, canvas);
        }else{
          drawGameOver();
        }
      }

      function main(){
        canvas = document.createElement("canvas");
        canvas.width = GRID_SIZE * CELL_PIXELS;
        canvas.height = GRID_SIZE * CELL_PIXELS;
        ctx = canvas.getContext("2d");
        document.body.appendChild(canvas);
        frames = 0;
        keystate = {};

        document.addEventListener("keydown", function(evt){
          keystate[evt.keyCode] = true;
        });
        document.addEventListener("keyup", function(evt){
          delete keystate[evt.keyCode];
          currentMove = null;
          lastMove = null;
        });
        init();
        loop();
      }

    main();
