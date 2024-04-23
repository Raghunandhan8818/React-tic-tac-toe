describe("Tic Tac Toe Board", () => {

    beforeEach(() => {
        cy.visit("http://localhost:3000/")
    })
    it("should be nine squares by default", () => {
        cy.get('[data-testid="square"]').should('have.length', 9)

    })

    it("should display null as a default value at all the squares", () => {
        cy.get('[data-testid="square"]').should('have.value', '')

    })

    it("should display next player as X in the beginning", () => {
        cy.get('[data-testid="status"]').should('have.text', "Next player: X")
    })

})




describe("Tic Tac Toe Game", () => {

    beforeEach(() => {
        cy.visit("http://localhost:3000/")
    })


    it("should mark X on the any of the box when it is clicked first", () => {
        cy.get('[data-testid="square"]').eq(2).click().should("have.text", "X")
    })

    it("should not alter the box which is already been marked", () => {
        cy.get('[data-testid="square"]').eq(2).click().should("have.text", "X")
    })

    it("should display next player as O when the first box is clicked", () => {
        cy.get('[data-testid="square"]').eq(1).click()
        cy.get('[data-testid="status"]').should('have.text', "Next player: O")
    })

    it("should be able mark X and O randomly for all squares", () => {
        fillFirstSixSquares();
        cy.get('[data-testid="square"]').eq(7).click().should("have.text", "X")
        cy.get('[data-testid="square"]').eq(8).click().should("have.text", "O")
        cy.get('[data-testid="square"]').eq(6).click().should("have.text", "X")
    })

    it("should be able to declare the right Winner", () => {
        fillFirstSixSquares();
        cy.get('[data-testid="square"]').eq(6).click().should("have.text", "X")
        cy.get('[data-testid="status"]').should('have.text', "Winner: X")
    })

    it("should not allow the next move after the winner declaration", () => {
        fillFirstSixSquares();
        cy.get('[data-testid="square"]').eq(6).click().should("have.text", "X")
        cy.get('[data-testid="square"]').eq(8).click().should("have.text", '')
    })

})


describe("Tic Tac Toe History Buttons", () => {

    beforeEach(() => {
        cy.visit("http://localhost:3000/")
    })

    it("should display  reset button by default", () => {
        cy.contains("li", "Reset")
    })

    it("should contain 2 moves after the first player marked", () => {
        cy.get('[data-testid="square"]').eq(8).click()
        cy.get('[data-testid="game-info-li"]').should("have.length", 2)
    })

    it("should disply proper text in the consecutive buttons ", () => {
        cy.get('[data-testid="game-info-li"]').eq(0).should("have.text", "Reset")
        cy.get('[data-testid="square"]').eq(8).click()
        cy.get('[data-testid="game-info-li"]').eq(1).should("have.text", "Go to move #1")
        cy.get('[data-testid="square"]').eq(3).click()
        cy.get('[data-testid="game-info-li"]').eq(2).should("have.text", "Go to move #2")
    })

})

describe("Tic Tac Toe History Reload", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/")
        fillFirstSixSquares();
    })

    it("should reset the game to default when the Reset button in clickd", () => {
        cy.get('[data-testid="game-info-li"]').eq(0).click();
        cy.get('[data-testid="square"]').should('have.value', '')
    })

    it("should reset the game to the particular move when the corresponding button is clicked", () => {
        cy.get('[data-testid="game-info-li"]').eq(1).click();
        cy.get('[data-testid="square"]').eq(0).should('have.text', 'X')
        checkRemaingSquaresAreNull(1);
        cy.get('[data-testid="game-info-li"]').eq(3).click();
        checkSquaresAreValid(3)
        checkRemaingSquaresAreNull(3);
    })

    it("should not display any further history buttons, once a move is made after clicking any of the history buttons", () => {
        cy.get('[data-testid="game-info-li"]').eq(1).click();
        checkSquaresAreValid(1)
        checkRemaingSquaresAreNull(1);
        cy.get('[data-testid="square"]').eq(6).click()
        cy.get('[data-testid="game-info-li"]').should("have.length", 3)
    })
})


function fillFirstSixSquares() {
    for (let i = 0; i < 6; i++) {
        let text = ''
        if (i % 2 == 0) {
            text = "X"
        } else {
            text = "O"
        }
        cy.get('[data-testid="square"]').eq(i).click().should("have.text", text)
    }
};

function checkSquaresAreValid(move) {
    for (let i = 0; i < move; i++) {
        if (i % 2 == 0) {
            cy.get('[data-testid="square"]').eq(i).should("have.text", "X")
        } else {
            cy.get('[data-testid="square"]').eq(i).should("have.text", "O")
        }

    }
}

function checkRemaingSquaresAreNull(initial_square) {
    for (let i = initial_square; i < 9; i++) {
        cy.get('[data-testid="square"]').eq(i).should("have.text", '')
    }
}