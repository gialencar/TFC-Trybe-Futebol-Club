import { Request, Response } from 'express';
import IController from '../../../common/interfaces/IController';
import FinishMatchUseCase from './FinishMachUseCase';

export default class FinishMatchController implements IController {
  constructor(private finishMatchUseCase: FinishMatchUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const result = await this.finishMatchUseCase.execute(+id);

    if (!result) return res.status(400).send();

    return res.status(200).json({ message: 'Finished' });
  }
}
