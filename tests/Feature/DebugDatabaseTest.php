<?php

test('debug database explorer can be accessed', function () {
    $response = $this->get('/debug/database');

    $response->assertStatus(200);
});
