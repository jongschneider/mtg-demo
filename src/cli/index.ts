import { Cli } from 'clipanion';
import { AddCardCommand } from './commands/add-card';
import { AddToCollectionCommand } from './commands/add-to-collection';
import { ListCollectionCommand } from './commands/list-collection';

const cli = new Cli({
  binaryLabel: 'MTG Collection CLI',
  binaryName: 'mtg-cli',
  binaryVersion: '1.0.0',
});

// Register commands
cli.register(AddCardCommand);
cli.register(AddToCollectionCommand);
cli.register(ListCollectionCommand);

// Run the CLI
export async function main(): Promise<void> {
  const exitCode = await cli.run(process.argv.slice(2), {
    ...Cli.defaultContext,
    stdin: process.stdin,
    stdout: process.stdout,
    stderr: process.stderr,
  });

  process.exit(exitCode);
}

// Run if this file is executed directly
if (require.main === module) {
  main().catch((error) => {
    console.error('CLI execution failed:', error);
    process.exit(1);
  });
}
