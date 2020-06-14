import { registerBlockType } from '@wordpress/blocks';
import { TextControl } from '@wordpress/components';
import { FormFileUpload } from '@wordpress/components';
import { withState } from '@wordpress/compose';
import { SketchPicker } from 'react-color';

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
        setAttributes( { paletteData: arr } );
        console.log(attributes)
      }
      function removePalette( index ) {
        console.log(`removing palette at index: ${index}`)
        let arr = [...attributes.paletteData];
        arr.splice(index, 1);
        setAttributes( { paletteData: arr } );
        console.log(attributes)
      }


      const MyColorPalette = withState({ active: false, color: '' })( ({ index, setState, active, color }) => {

          return (
            <div className={`colorPicker`}>
              <div className={`colorPreview`} style={{background: attributes.paletteData[index] }}  onClick={ () => setState( ( state ) => ( { active: !active} ) ) }></div>
              { active &&
                <div className={`container`}>
                  <SketchPicker
                    color={ color }
                    onChange={ ( color ) => {
                      setState( { color: color.hex } )
                    } }
                  />
                  <button className={`confirm`} onClick={() => updatePalette(color, index)}>Confirm</button>
                </div>
              }
            </div>
          )
      } );

      const TestButton = withState( {
      	count: !attributes.paletteData ? 0 : attributes.paletteData.length,
      } )( MyCounter );

      function MyCounter( { count, setState } ) {
      	return (
      		<>
            <h5 className={`title`}>Select Palette</h5>
            <div className={`palettes`}>
              { Array.apply(null, Array(count)).map((each,i) =>
                <div key={i} className={`palette`}>
                  <MyColorPalette index={i}/>
                  <button className={'removePalette'} onClick={ () => removePalette( i )}>
                    <i className="gg-close"></i>
                  </button>
                </div>
              )}
              <button className={`add`} onClick={ () => setState( ( state ) => ( { count: state.count + 1 } ) ) }>
                Add
              </button>
            </div>
      		</>
      	);
      }

      return (
          <div style={{ padding: '0.5rem', flex: 1, flexDirection: 'row' }}>
            <TestButton/>
          </div>
      );
    },

    // No information saved to the block
    // Data is saved to post meta via attributes
    save() {
        return null;
    },
} );

registerBlockType( 'ironeko/website-data', {
    title: 'Website Link Meta Block',
    icon: 'smiley',
    category: 'common',

    attributes: {
      	website: {
            type: 'string',
            source: 'meta',
            meta: 'website',
        }
    },

    edit( { setAttributes, attributes } ) {

      const confirmLink = ( link ) => {
        console.log(`Setting ${link}`)
        setAttributes( { website: link } )
      }

      const WebsiteAddress = withState( {
          link: attributes.website ? attributes.website : '',
      } )( ( { link, setState } ) => (
        <div className={`inputcontainer`}>
          <TextControl
              value={ link }
              onChange={ ( link ) => setState( { link } ) }
          />
          <button className={`add`} onClick={() => confirmLink( link )}>Done</button>
        </div>
      ) );

      return (
          <div style={{ padding: '0.5rem', flex: 1, flexDirection: 'row' }}>
            <h5 className={`title`}>Website Address</h5>
            <WebsiteAddress/>
          </div>
      );
    },

    // No information saved to the block
    // Data is saved to post meta via attributes
    save() {
        return null;
    },
} );
