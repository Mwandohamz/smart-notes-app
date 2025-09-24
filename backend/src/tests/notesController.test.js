// notesController.test.js - Quality Control for the Head Chef

// 1. Import the testing framework and the chef we're testing
const { handleSummarize } = require('../controllers/notesController');

// 2. Mock the AI specialty cook (so we don't use real OpenAI)
jest.mock('../services/openaiService', () => ({
  generateSummary: jest.fn()
}));

const openaiService = require('../services/openaiService');

describe('handleSummarize Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  // 3. Test Scenario 1: Missing text should return 400 error
  it('should return 400 error when no text is provided', async () => {
    // Create a fake empty order
    const mockRequest = { body: {} };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // Have the chef process the empty order
    await handleSummarize(mockRequest, mockResponse);

    // Check that the chef correctly rejected the order
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'Missing required "text" in request body'
    });
  });

  // 4. Test Scenario 2: Valid request should return summary
  it('should return 200 with summary when text is provided', async () => {
    // Create a fake valid order
    const mockRequest = { 
      body: { text: 'This is some text to summarize' } 
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // Tell the mock AI cook what to return
    openaiService.generateSummary.mockResolvedValue('Mocked summary result');

    // Have the chef process the valid order
    await handleSummarize(mockRequest, mockResponse);

    // Check that everything worked correctly
    expect(openaiService.generateSummary).toHaveBeenCalledWith('This is some text to summarize');
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      summary: 'Mocked summary result'
    });
  });
});