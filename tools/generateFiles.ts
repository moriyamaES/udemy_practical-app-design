import inquirer from "inquirer";
import path from "path";
import { generateEntity, generateRepositoryInterface } from "./templates/entityLayer";
import { lowercaseFirst, writeFile } from "./utils";
import { generateUseCase, generateUseCaseInterface, generateRequestDto, generateResponseDto } from "./templates/useCaseLayer";

async function generateRepositoryLayer() {
  const { entityName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'entityName',
      message: 'エンティティ名を入力してください',
    },
  ]);
  const basePath = path.join(__dirname, '..', 'src', 'domain');
  const repositoryInterfaceContent = generateRepositoryInterface(entityName);
  writeFile(
    path.join(basePath, 'repositories', `${lowercaseFirst(entityName)}RepositoryInterface.ts`),
    repositoryInterfaceContent
  )
}


async function generateEntityLayer() {
  const { entityName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'entityName',
      message: 'エンティティ名を入力してください',
    },
  ]);
  const basePath = path.join(__dirname, '..', 'src', 'domain');
  const entityContent = generateEntity(entityName);
  writeFile(
    path.join(basePath, 'entities', `${lowercaseFirst(entityName)}.ts`),
    entityContent
  )
}

async function generateUseCaseLayer() {
  const { entityName, useCaseName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'entityName',
      message: 'エンティティ名を入力してください',
    },
    {
      type: 'input',
      name: 'useCaseName',
      message: 'ユースケース名を入力してください',
    },
  ]);
  const basePath = path.join(__dirname, '..', 'src', 'application');
  const entityContent = generateEntity(entityName);
  writeFile(
    path.join(basePath, 'entities', `${lowercaseFirst(entityName)}.ts`),
    entityContent
  )
  
  const RepositoryInterfaceContent = generateUseCaseInterface(entityName, useCaseName);
  writeFile(
    path.join(basePath, 'repositories', `${lowercaseFirst(entityName)}RepositoryInterface.ts`), RepositoryInterfaceContent
  ) 
}

async function main() {
  const layers = [
    'Entity',
    'UseCase',
    'Interface adapter',
    'Framework & driver',
  ] as const

  type Layer = (typeof layers)[number]

  const { layer }: {layer: Layer} = await inquirer.prompt([
    {
      type: 'list',
      name: 'layer',
      message: 'どの層のファイルを生成しますか？',
      choices: layers,
    }
  ])

  if (layer === 'Entity'){
    await generateEntityLayer()
  } else if (layer === 'UseCase') {
    console.log('UseCase')
  } else if (layer === 'Interface adapter') {
    console.log('Interface adapter')
  } else if (layer === 'Framework & driver') {
    console.log('Framework & driver')
  }
}

main()
