import { registerBlockType } from '@wordpress/blocks';
import { ColorPalette } from '@wordpress/components';
import { withState } from '@wordpress/compose';

registerBlockType( 'ironeko/palette-data', {
    title: 'Palette Meta Block',
    icon: 'smiley',
    category: 'common',

    attributes: {
      	paletteData: {
            type: 'array',
            source: 'meta',
            meta: 'paletteData',
        }
    },

    edit( { className, setAttributes, attributes } ) {
	    if(!attributes.paletteData) {
			console.log("initializing");
	    	attributes.paletteData = [''];
			  console.log(attributes);
	    }
      function updatePalette( color, index ) {
        console.log(`Setting value: ${color} for index: ${index}`);
        let arr = [...attributes.paletteData];
        arr[index] = color;
        // attributes.paletteData[index] = color;
        // console.log('Array is:');
        // console.log(arr);
        setAttributes( { paletteData: arr } );
        // console.log('Final data is:');
        // console.log(attributes.paletteData);
      }
      function removePalette({index}) {
        console.log(`removing palette at index: ${index}`)
        let arr = [...attributes.paletteData];
        arr.splice(index, 1);
        setAttributes( { paletteData: arr } );
        console.log(attributes)
      }

      function MyCounter( { count, setState, palette } ) {
      	return (
      		<>
      			<button onClick={ () => setState( ( state ) => ( { count: state.count + 1 } ) ) }>
      				Add Palette
      			</button>
            <div className={'paletteContainer'}>
            { Array.apply(null, Array(count)).map((each,i) =>
              <div className={'paletteSnippet'}>
                <div style={{ backgroundColor: palette[i] }} className={'palettePreview'}/>
                <ColorPalette
                   value={ palette[i] }
                   onChange={ (color) => updatePalette( color, i ) }
                   className={ 'addPalette' }
                />
                <button className={'removePalette'} onClick={ () => removePalette( i )}>
                  Remove
                </button>
              </div>
            )}
            </div>
      		</>
      	);
      }

      const TestButton = withState( {
      	count: !attributes.paletteData ? 0 : attributes.paletteData.length,
      } )( MyCounter );

      return (
          <div style={{ padding: '0.5rem', flex: 1, flexDirection: 'row' }}>
            <TestButton palette={attributes.paletteData}/>
          </div>
      );
    },

    // No information saved to the block
    // Data is saved to post meta via attributes
    save() {
        return null;
    },
} );
