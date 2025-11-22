import { Command, Option } from 'clipanion';
import { addCardToCollection } from '../../queries';
import { getDefaultUser } from '../utils/user';

export class AddToCollectionCommand extends Command {
  static paths = [['add-to-collection']];

  cardId = Option.String('--card-id', {
    required: true,
    description: 'The ID of the card to add to collection',
  });

  quantity = Option.String('--quantity', {
    description: 'Quantity to add (default: 1)',
  });

  async execute(): Promise<number> {
    try {
      const userId = await getDefaultUser();
      const quantity = this.quantity ? parseInt(this.quantity, 10) : 1;

      if (isNaN(quantity) || quantity <= 0) {
        this.context.stderr.write('Quantity must be a positive number\n');
        return 1;
      }

      await addCardToCollection(userId, this.cardId, quantity);

      this.context.stdout.write(`Successfully added ${quantity} "${this.cardId}" to collection\n`);
      return 0;

    } catch (error) {
      this.context.stderr.write(`Error adding card to collection: ${error}\n`);
      return 1;
    }
  }
}
