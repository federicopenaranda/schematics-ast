import ts, { factory, SyntaxKind, TypeElement } from 'typescript';

export type BasicPropType = {
  propName: string, 
  propType: 'string' | 'number' | 'boolean'
};

export function createBasicTypeFile(props: BasicPropType[], typeName: string): string {
  const propTypes: TypeElement[] = [];

  for (let prop of props) {
    let stringKeyword: SyntaxKind | undefined = undefined;

    if ( prop.propType === 'string' ) {
      stringKeyword = ts.SyntaxKind.StringKeyword;
    } else if ( prop.propType === 'number' ) {
      stringKeyword = ts.SyntaxKind.NumberKeyword;
    } else if ( prop.propType === 'boolean' ) {
      stringKeyword = ts.SyntaxKind.BooleanKeyword;
    } else {
      return '';
    }

    const propType = factory.createPropertySignature(
      undefined,
      factory.createIdentifier(prop.propName),
      undefined,
      factory.createKeywordTypeNode(stringKeyword)
    );

    propTypes.push(propType);
  }

  if ( !propTypes.length ) {
    return '';
  }

  const finalType = factory.createTypeAliasDeclaration(
    [factory.createToken(ts.SyntaxKind.ExportKeyword)],
    factory.createIdentifier(typeName),
    undefined,
    factory.createTypeLiteralNode([...propTypes])
  );

  const nodes = factory.createNodeArray([finalType]);
  const sourceFile = ts.createSourceFile(
    'placeholder.ts',
    '',
    ts.ScriptTarget.ESNext,
    true,
    ts.ScriptKind.TS
  );
  const printer = ts.createPrinter();
  return printer.printList(ts.ListFormat.MultiLine, nodes, sourceFile);
}




// Admin type

// const userProp = factory.createPropertySignature(
//   undefined,
//   factory.createIdentifier('user'),
//   undefined,
//   factory.createTypeReferenceNode(factory.createIdentifier('User'), undefined)
// )

// const adminType = factory.createTypeAliasDeclaration(
//   [factory.createToken(ts.SyntaxKind.ExportKeyword)],
//   factory.createIdentifier("Admin"),
//   undefined,
//   factory.createTypeLiteralNode([userProp])
// );