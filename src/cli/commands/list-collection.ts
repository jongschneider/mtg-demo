import { Command, Option } from 'clipanion';
import { getUserCollection } from '../../queries';
import { getDefaultUser } from '../utils/user';

export class ListCollectionCommand extends Command {
  static paths = [['list-collection']];

  format = Option.String('--format', {
    description: 'Output format (table or json)',
  });

  async execute(): Promise<number> {
    try {
      const userId = await getDefaultUser();
      const collection = await getUserCollection(userId);

      if (collection.length === 0) {
        this.context.stdout.write('Collection is empty\n');
        return 0;
      }

      const outputFormat = this.format || 'table';

      if (outputFormat === 'json') {
        this.context.stdout.write(JSON.stringify(collection, null, 2) + '\n');
      } else {
        // Table format
        this.context.stdout.write('Card Name'.padEnd(30) + 'Quantity'.padStart(10) + 'Set Code'.padStart(12) + '\n');
        this.context.stdout.write('-'.repeat(54) + '\n');

        for (const item of collection) {
          const name = item.card.name.length > 27 ? item.card.name.substring(0, 27) + '...' : item.card.name;
          const quantity = item.quantity.toString();
          const setCode = item.card.setCode || 'N/A';

          this.context.stdout.write(
            name.padEnd(30) +
            quantity.padStart(10) +
            setCode.padStart(12) +
            '\n'
          );
        }
      }

      return 0;

    } catch (error) {
      this.context.stderr.write(`Error listing collection: ${error}\n`);
      return 1;
    }
  }
}
