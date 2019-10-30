class Game {
    constructor() {
        this.turn = null;
        this.board = new Array(8);
        for (let i=0; i < 8; i++) {
            this.board[i] = new Array(8);
        }
        this.selected_piece = null;
        this.target = null;

        this.setupGame();
        this.drawGameBoard();
        this.drawPieces();
        this.handleGame();
    }

    drawGameBoard() {
        let columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

        for (let y = 8; y >= 1; y--) {
            let cell_class = y % 2 == 0 ? "cellBlack" : "cellWhite";
            for (let x = 0; x <= 7; x++) {
                cell_class = cell_class == "cellBlack" ? "cellWhite" : "cellBlack";

                $("<div>", {
                    "class": "cell " + cell_class,
                    id: columns[x] + y
                }).appendTo(".container");
            }
        }
    }

    drawPieces() {
        let columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

        $(".container div").empty();

        for (let y = 0; y <= 7; y++) {
            for (let x = 0; x <= 7; x++) {
                let square_info = this.board[x][y];
                if (square_info instanceof Piece) {
                    $("<img>", {
                        "src": square_info.image,
                        "class": "piece"
                    }).appendTo($("#" + columns[x] + (8 - y)));
                }
            }
        }
    }

    handleGame() {
        let _this = this;
        $(".container div").on("click", function () {
            if ($(this).children().length > 0) {
                $(".selected_piece").removeClass("selected_piece");
                _this.selected_piece = $(this);
                $(this).addClass("selected_piece");
            } else if (_this.selected_piece != null) {
                let from = _this.selected_piece.attr("id");
                let to = $(this).attr("id");
                let indexFrom = _this.positionToIndex(from);
                let indexTo = _this.positionToIndex(to);
                _this.movePiece(indexFrom, indexTo);
            }
        });
    }

    movePiece(from, to) {
        let piece = this.board[from.x][from.y];
        this.board[from.x][from.y] = null;
        this.board[to.x][to.y] = piece;

        $(".selected_piece").removeClass("selected_piece");
        this.drawPieces();
    }

    setupGame() {
        this.setupPieces();
    }

    positionToIndex(position) {
        let columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        let pos_x = columns.indexOf(position.substring(0, 1));
        let pos_y = 8 - Number(position.substring(1));

        return { x: pos_x, y: pos_y }
    }

    /*
     * piece: object
     * position: string
     */
    addPiece(piece, position) {
        let index = this.positionToIndex(position);
        this.board[index.x][index.y] = piece;
    }

    setupPieces() {
        this.addPiece(new Piece("rook", "b"), "A8");
        this.addPiece(new Piece("knight", "b"), "B8");
        this.addPiece(new Piece("bishop", "b"), "C8");
        this.addPiece(new Piece("queen", "b"), "D8");
        this.addPiece(new Piece("king", "b"), "E8");
        this.addPiece(new Piece("bishop", "b"), "F8");
        this.addPiece(new Piece("knight", "b"), "G8");
        this.addPiece(new Piece("rook", "b"), "H8");
        this.addPiece(new Piece("pawn", "b"), "A7");
        this.addPiece(new Piece("pawn", "b"), "B7");
        this.addPiece(new Piece("pawn", "b"), "C7");
        this.addPiece(new Piece("pawn", "b"), "D7");
        this.addPiece(new Piece("pawn", "b"), "E7");
        this.addPiece(new Piece("pawn", "b"), "F7");
        this.addPiece(new Piece("pawn", "b"), "G7");
        this.addPiece(new Piece("pawn", "b"), "H7");

        this.addPiece(new Piece("pawn", "w"), "A2");
        this.addPiece(new Piece("pawn", "w"), "B2");
        this.addPiece(new Piece("pawn", "w"), "C2");
        this.addPiece(new Piece("pawn", "w"), "D2");
        this.addPiece(new Piece("pawn", "w"), "E2");
        this.addPiece(new Piece("pawn", "w"), "F2");
        this.addPiece(new Piece("pawn", "w"), "G2");
        this.addPiece(new Piece("pawn", "w"), "H2");
        this.addPiece(new Piece("rook", "w"), "A1");
        this.addPiece(new Piece("knight", "w"), "B1");
        this.addPiece(new Piece("bishop", "w"), "C1");
        this.addPiece(new Piece("queen", "w"), "D1");
        this.addPiece(new Piece("king", "w"), "E1");
        this.addPiece(new Piece("bishop", "w"), "F1");
        this.addPiece(new Piece("knight", "w"), "G1");
        this.addPiece(new Piece("rook", "w"), "H1");
    }
}

class Piece {
    constructor(type, color) {
        this.type = type;
        this.color = color;

        this.image = "images/" + color + "_" + type + ".png";
    }

    placePiece() {
//        let img_position = "#" + this.position_x + this.position_y;

        $("<img>", {
            "src": this.image,
            "class": "piece"
        }).appendTo(img_position);
    }
}


$(document).ready(function () {
    let game = new Game();
});