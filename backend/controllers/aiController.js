import genAI from '../config/gemini.js'
import Task from '../models/Task.js'

export const generateSubtasks = async (req, res) => {
  try {
    const { taskId } = req.params
    const { title, description } = req.body

    if (!taskId) {
      return res.status(400).json({ message: 'Task ID is required' })
    }

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: 'Task title and description are required' })
    }

    const aiModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const fullPrompt = `
      You are a project management expert.

      Break down this task into actionable subtasks:

      Task Title: "${title}"
      Task Description: "${description}"

      Provide a JSON array of subtasks with this structure:
      [
        {
          "title": "subtask name",
          "description": "brief description",
          "priority": "low/medium/high",
          "estimatedTime": "time estimate"
        }
      ]

      Requirements:
      1. Generate 3-7 specific, actionable subtasks
      2. Each subtask should be independent
      3. Keep descriptions concise
      4. Assign realistic priorities
      5. Return ONLY valid JSON, no extra text

      Return only the JSON array.
      `

    const result = await aiModel.generateContent(fullPrompt)
    const responseText = result.response.text()

    const cleanedResponse = responseText
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim()

    let subtasks
    try {
      subtasks = JSON.parse(cleanedResponse)
    } catch (parseError) {
      return res.status(500).json({
        message: 'Failed to parse AI response'
      })
    }

    if (!Array.isArray(subtasks)) {
      return res.status(500).json({
        message: 'Invalid subtasks format'
      })
    }

    const task = await Task.findByIdAndUpdate(
      taskId,
      { subtasks },
      { new: true }
    ).populate('createdBy assignedTo')

    if (!task) {
      return res.status(404).json({
        message: 'Task not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Subtasks generated successfully',
      task
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Failed to generate subtasks'
    })
  }
}
