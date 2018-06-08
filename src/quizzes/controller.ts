import {
  JsonController,
  NotFoundError,
  Post,
  HttpCode,
  Get,
  Body,
  Param,
  Delete,
  CurrentUser
} from 'routing-controllers'
import Quiz from './entity'

type User = {
  userId: number
  isTeacher: boolean
}

@JsonController()
export default class QuizController {
  @Get('/quizzes/:id')
  getQuiz(@Param('id') id: number) {
    return Quiz.findOneById(id)
  }

  @Get('/quizzes')
  async allQuizzes(@CurrentUser() user: User) {
    console.log(user)

    const quizzes = await Quiz.find()
    return { quizzes }
  }

  @Post('/quizzes')
  @HttpCode(201)
  createQuiz(@Body() quiz: Quiz) {
    return quiz.save()
  }

  @Delete('/quizzes/:id')
  async deleteQuiz(@Param('id') id: number) {
    const quiz = await Quiz.findOneById(id)

    if (!quiz) throw new NotFoundError('Nothing to Delete here!')

    if (quiz) Quiz.removeById(id)
    return 'Quiz Deleted.'
  }
}
