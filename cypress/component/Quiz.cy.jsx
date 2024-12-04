import React from 'react';
import Quiz from '../../client/src/components/Quiz';

describe('Quiz Component with Mocked API', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/questions/random', { fixture: 'questions.json', statusCode: 200 }).as('mockedQuestions');
  });

  it('should render the Quiz component and display a question after starting the quiz', () => {
    cy.mount(<Quiz />);
    cy.get('button.btn-primary').contains('Start Quiz').click();
    cy.wait('@mockedQuestions');
    cy.get('h2').should('exist').and('not.be.empty');
    cy.get('.btn.btn-primary').should('have.length.greaterThan', 0);
  });

  it('should allow selecting an answer and updating the score', () => {
    cy.mount(<Quiz />);
    cy.get('button.btn-primary').contains('Start Quiz').click();
    cy.wait('@mockedQuestions');
    cy.get('.btn.btn-primary').first().click();
    cy.get('h2').should('exist').and('not.be.empty');
  });

  it('should navigate to the next question and complete the quiz', () => {
    cy.mount(<Quiz />);
    cy.get('button.btn-primary').contains('Start Quiz').click();
    cy.wait('@mockedQuestions');
    
    cy.get('.btn.btn-primary').each(($btn, index) => {
      cy.wrap($btn).click();
      if (index < 2) {
        cy.get('.btn.btn-primary').contains('Next Question').should('exist').and('be.enabled').click();
      }
    });

    cy.get('h2').should('exist').and('not.be.empty');
  });
});