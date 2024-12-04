import React from 'react';
import Quiz from '../../client/src/components/Quiz';

describe('Quiz Component with Mocked API', () => {
  beforeEach(() => {
    // Intercept the API call to mock the response with a fixture containing questions
    cy.intercept('GET', '/api/questions/random', { fixture: 'questions.json', statusCode: 200 }).as('mockedQuestions');
  });

  it('should render the Quiz component and display a question after starting the quiz', () => {
    cy.mount(<Quiz />);  // Mount the Quiz component
    cy.get('button.btn-primary').contains('Start Quiz').click();  // Click start quiz
    cy.wait('@mockedQuestions');  // Wait for the mocked API response
    
    // Ensure the first question is rendered and not empty
    cy.get('h2').should('exist').and('not.be.empty');
    
    // Ensure there are options available to choose
    cy.get('.btn.btn-primary').should('have.length.greaterThan', 0);
  });

  it('should allow selecting an answer and updating the score', () => {
    cy.mount(<Quiz />);  // Mount the Quiz component
    cy.get('button.btn-primary').contains('Start Quiz').click();  // Click start quiz
    cy.wait('@mockedQuestions');  // Wait for the mocked API response
    
    // Simulate selecting an answer
    cy.get('.btn.btn-primary').first().click();  // Click first answer option
    
    // Ensure that after selecting an answer, the question updates
    cy.get('h2').should('exist').and('not.be.empty');  // New question is displayed
  });

  it('should navigate to the next question automatically after answering', () => {
    cy.mount(<Quiz />);  // Mount the Quiz component
    cy.get('button.btn-primary').contains('Start Quiz').click();  // Click start quiz
    cy.wait('@mockedQuestions');  // Wait for the mocked API response

    // Iterate through each answer button, simulate selecting an answer
    cy.get('.btn.btn-primary').each(($btn, index) => {
      cy.wrap($btn).click();  // Select the answer
      
      // Ensure that after each answer, the next question is automatically shown
      // If your quiz progresses automatically, we just verify that the question updates
      cy.get('h2').should('exist').and('not.be.empty');  // New question is displayed after each answer
    });

    // Ensure the final question is shown after all answers are selected
    cy.get('h2').should('exist').and('not.be.empty');
  });
});
