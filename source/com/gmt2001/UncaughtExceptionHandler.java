/*
 * Copyright (C) 2016-2023 phantombot.github.io/PhantomBot
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package com.gmt2001;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.io.Writer;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.List;

import com.gmt2001.util.Reflect;
import com.illusionaryone.Logger;

/**
 * Catches exceptions which have not been caught elsewhere
 *
 * @author gmt2001
 */
public final class UncaughtExceptionHandler implements Thread.UncaughtExceptionHandler {

    private static final UncaughtExceptionHandler INSTANCE = new UncaughtExceptionHandler();

    /**
     * Instance
     *
     * @return an instance
     */
    public static UncaughtExceptionHandler instance() {
        return INSTANCE;
    }

    /**
     * Handles uncaught exceptions
     * <p>
     * In addition to sending to the regular error handler (Console, {@code core-error} log, Rollbar),
     * the exception is logged in the {@code stacktraces} folder
     * <p>
     * If the exeption is an {@link java.lang.OutOfMemoryError}, then a heap dump is additionally created
     *
     * @param t the thread on which the exception was thrown
     * @param e the exception that was thrown
     */
    @Override
    public void uncaughtException(Thread t, Throwable e) {
        try ( Writer trace = new StringWriter()) {
            try ( PrintWriter ptrace = new PrintWriter(trace)) {

                e.printStackTrace(ptrace);

                if (e.getClass().equals(java.lang.OutOfMemoryError.class)) {
                    Reflect.dumpHeap();
                    com.gmt2001.Console.err.println("OutOfMemoryError: Heap Dump Created");
                }

                com.gmt2001.Console.err.printStackTrace(e, true);

                String timestamp = Logger.instance().logFileTimestamp();

                Path p = PathValidator.getRealPath(Paths.get("./logs/stacktraces/" + timestamp + ".txt"));
                Files.createDirectories(p.getParent());

                Files.write(p, List.of("[" + timestamp + "] " + trace.toString()), StandardCharsets.UTF_8, StandardOpenOption.CREATE,
                        StandardOpenOption.APPEND, StandardOpenOption.WRITE);
            }
        } catch (IOException ex) {
            com.gmt2001.Console.err.printStackTrace(ex);
        }
    }
}
