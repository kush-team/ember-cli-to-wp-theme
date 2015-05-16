<?php
add_action( 'admin_menu', 'ember_add_admin_menu' );
add_action( 'admin_init', 'ember_settings_init' );
add_action( 'after_setup_theme', 'ember_setup' );

function ember_setup() {
	register_nav_menus( array(
		'primary' => __( 'Primary Menu', 'ember-theme' )
	) );
}


function ember_add_admin_menu(  ) { 

	add_menu_page( 'Ember Theme', 'Ember Theme', 'manage_options', 'ember_theme', 'ember_theme_options_page' );

}


function ember_settings_init(  ) { 

	register_setting( 'pluginPage', 'ember_settings' );

	add_settings_section(
		'ember_pluginPage_section', 
		__( 'Theme configuration', 'wordpress' ), 
		'ember_settings_section_callback', 
		'pluginPage'
	);

	add_settings_field( 
		'ember_theme_title', 
		__( 'Title', 'wordpress' ), 
		'ember_text_field_0_render', 
		'pluginPage', 
		'ember_pluginPage_section' 
	);
}


function ember_text_field_0_render(  ) { 

	$options = get_option( 'ember_settings' );
	?>
	<input type='text' name='ember_settings[ember_theme_]' value='<?php echo $options['ember_theme_']; ?>'>
	<?php

}


function ember_settings_section_callback(  ) { 

	echo __( 'Blog Name', 'wordpress' );

}


function ember_theme_options_page(  ) { 

	?>
	<form action='options.php' method='post'>
		
		<h2>Ember Theme</h2>
		
		<?php
		settings_fields( 'pluginPage' );
		do_settings_sections( 'pluginPage' );
		submit_button();
		?>
		
	</form>
	<?php

}

?>