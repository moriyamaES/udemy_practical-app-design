import inquirer from "inquirer";
import path from "path";
import { generateEntity, generateRepositoryInterface } from "./templates/entityLayer";
import { lowercaseFirst, writeFile } from "./utils";
import { generateUseCase, generateUseCaseInterface, generateRequestDto, generateResponseDto } from "./templates/useCaseLayer";
import { generateController, generatePrismaRepository } from "./templates/adapterLayer";
import { generateRouter } from "./templates/infrastructureLayer";
import { capitalize } from "./utils";

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

  const repositoryInterfaceContent = generateRepositoryInterface(entityName);
  writeFile(
    path.join(
      basePath,
      'repositories',
      `${lowercaseFirst(entityName)}RepositoryInterface.ts`
    ),
    repositoryInterfaceContent
  );
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
  const useCaseInterfaceContent = generateUseCaseInterface(entityName, useCaseName);
  writeFile(
    path.join(
      basePath,
      'useCases',
      `${entityName}`,
      `${lowercaseFirst(useCaseName)}UseCaseInterface.ts`
    ),
    useCaseInterfaceContent
  )

  const useCaseContent = generateUseCase(entityName, useCaseName);
  writeFile(
    path.join(
      basePath,
      'useCases',
      `${entityName}`,
      `${lowercaseFirst(useCaseName)}UseCase.ts`
    ),
    useCaseContent
  )  

  const requestDtoContent = generateRequestDto(useCaseName);
  writeFile(
    path.join(
      basePath,
      'dtos',
      `${entityName}`,
      `${lowercaseFirst(useCaseName)}RequestDto.ts`
    ),
    requestDtoContent
  )

  const responseDtoContent = generateResponseDto(useCaseName);
  writeFile(
    path.join(
      basePath,
      'dtos',
      `${entityName}`,
      `${lowercaseFirst(useCaseName)}ResponseDto.ts`
    ),
    responseDtoContent
  )
}

async function generateInterfaceAdapterLayer() {
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
  const basePath = path.join(__dirname, '..', 'src', 'adapter');
  const controllerContent = generateController(entityName, useCaseName);
  writeFile(
    path.join(
      basePath,
      'controllers',
      `${lowercaseFirst(entityName)}Controller.ts`
    ),
    controllerContent
  )

  const repositoryContent = generatePrismaRepository(entityName);
  writeFile(
    path.join(
      basePath,
      'repositories',
      `prisma${capitalize(entityName)}Repository.ts`
    ),
    repositoryContent
  )
}

async function generateInfrastructureLayer() {
  const { entityName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'entityName',
      message: 'エンティティ名を入力してください',
    },
  ]);
  const basePath = path.join(__dirname, '..', 'src', 'infrastructure');
  const routerContent = generateRouter(entityName);
  writeFile(
    path.join(basePath, 'web', 'routers', `${lowercaseFirst(entityName)}Router.ts`),
    routerContent
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
    await generateUseCaseLayer()
  } else if (layer === 'Interface adapter') {
    await generateInterfaceAdapterLayer()
  } else if (layer === 'Framework & driver') {
    await generateInfrastructureLayer()
  }
}
main()
