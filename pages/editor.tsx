import Head from 'next/head'
import styles from '../styles/Editor.module.scss'
import cn from "classnames";
import { MdAdd, MdClose, MdKeyboardArrowDown } from 'react-icons/md';
import { PageBuilder } from '../editor/PageBuilder';
import { DraggableChoiceList } from '../editor/DraggableChoiceList';
import React, { MouseEvent, useEffect } from 'react';
import { useMemo } from 'react';
import { initializeStore } from '../state/store';
import { useEditionState, useFillable } from '../state/selectors';
import { useDispatch } from 'react-redux';
import { appendPage, deleteField, moveFieldAfter, moveFieldBefore, setActiveField, setActivePage } from '../state/creator';
import { initialPage, Page } from '../engine/page';
import { useCallback } from 'react';
import names from "../engine/field_names.json";
import { fieldCode } from '../engine/creators';
import TopAppBar from '../editor/TopAppBar';
import { useState } from 'react';
import { Initializer } from '../ui/Initializer';
import { findNodeAtY } from '../core/utils';

export default function EditorScreen() {
  const [activeTab, setActiveTab] = useState("fields");
  const [compositionPanelOpen, setCompositionPanelOpen] = useState(true);

  const fillable = useFillable();
  const edition = useEditionState();
  const dispatch = useDispatch();

  const setHighlightedField = useCallback((id: string) => {
    dispatch(setActiveField(id));
  }, [dispatch]);

  const moveToPage = useCallback((id: string) => {
    dispatch(setActivePage(id));
  }, [dispatch]);

  const addPage = useCallback(() => {
    dispatch(appendPage(initialPage()))
  }, [dispatch])

  const updateActivePage = useCallback((next: Page) => {
    dispatch(appendPage(next));
  }, [dispatch])

  const activePage = useMemo(() => {
    return fillable.pages.find((p) => p.key === edition.activePage)
  }, [edition.activePage, fillable]);

  const removeField = useCallback((pageId: string, fieldId: string) => {
    return dispatch(deleteField(pageId, fieldId));
  }, [dispatch]);

  const onMouseLeaveDragZone = useCallback((ev: MouseEvent<HTMLElement>) => {
    let dropIndicator = ev.currentTarget.querySelector("span[data-role = drop-indicator]") as HTMLElement;
    if (dropIndicator) {
      ev.currentTarget.removeChild(dropIndicator);
    }
  }, []);

  const onDragFieldStarted = useCallback((ev: React.DragEvent<HTMLLIElement>, field: any) => {
    ev.dataTransfer.setData("field", field.key);
  }, []);

  const onDragFieldOver = useCallback((ev: React.DragEvent<HTMLUListElement>) => {
    ev.stopPropagation();
    ev.preventDefault();

    let eventYAxis = ev.clientY;
    let target = ev.currentTarget;

    let nodeAtPosition = findNodeAtY(target.children, eventYAxis);

    let dropIndicator = target.querySelector("span[data-role = drop-indicator]") as HTMLElement;

    if (!nodeAtPosition) {
      return;
    }

    if (dropIndicator && nodeAtPosition === dropIndicator) {
      return;
    }

    if (dropIndicator) {
      target.removeChild(dropIndicator);
    }

    dropIndicator = document.createElement("span");
    dropIndicator.setAttribute("data-role", "drop-indicator");
    dropIndicator.innerHTML = `<i class="fi-rr-add" data-role="icon"></i> Déplacer ici`;

    ///Where to position the indicator
    let placeBefore = true;
    let middle = nodeAtPosition.offsetTop + (nodeAtPosition.offsetHeight / 2);

    if (eventYAxis > middle) {
      placeBefore = false;
    }
    if (placeBefore) {
      target.insertBefore(dropIndicator, nodeAtPosition);
    }
    else {
      target.insertBefore(dropIndicator, nodeAtPosition.nextSibling);
    }

  }, []);

  const onDragFieldLeave = useCallback((ev: React.DragEvent<HTMLUListElement>) => {
    ev.stopPropagation();
    ev.preventDefault();
  }, []);

  const onDragFieldExit = useCallback((ev: React.DragEvent<HTMLUListElement>) => {
    ev.stopPropagation();
    ev.preventDefault();
    let { clientX, clientY } = ev;
    let { offsetTop, offsetLeft, clientHeight, clientWidth } = ev.currentTarget;
    if (
      (clientX < offsetLeft || clientX > (offsetLeft + clientWidth))
      || (clientY < offsetTop || clientY > (offsetTop + clientHeight))
    ) {
      /// not anymore inside the drop zone. remove drop indicator
      let dropIndicator = ev.currentTarget.querySelector("span[data-role = drop-indicator]") as HTMLElement;
      if (dropIndicator) {
        ev.currentTarget.removeChild(dropIndicator);
      }
    }
  }, []);

  const onDropField = useCallback((ev: React.DragEvent<HTMLUListElement>) => {
    let fieldId = ev.dataTransfer.getData("field");
    let dropIndicator = ev.currentTarget.querySelector("span[data-role = drop-indicator]") as HTMLElement;
    if (dropIndicator && fieldId) {
      let before = dropIndicator.previousSibling as HTMLElement;
      let next = dropIndicator.nextSibling as HTMLElement;

      if (next) {
        let nextId = next.getAttribute("data-field");
        dispatch(moveFieldBefore(activePage.key,fieldId, nextId));
      }
      else if (before) {
        let beforeId = before.getAttribute("data-field");
        dispatch(moveFieldAfter(activePage.key, fieldId, beforeId));
      }
      /// when done, remove indicator
      ev.currentTarget.removeChild(dropIndicator);
    }

  }, [dispatch, activePage]);

  useEffect(() => {
    moveToPage(fillable.pages[0].key);
  }, [])

  return (
    <Initializer redirectToSignin>
      <div className={styles.container}>
        <Head>
          <title>Editeur de schémas</title>
          <meta name="description" content="Editeur de schémas Polyfill" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <header className={styles.header}>
            <TopAppBar />
          </header>
          <section className={styles.structure_wrapper}>
            <div className={cn(styles.structure, styles.structure_pages)}>
              <header>
                <h4>Pages</h4>
                <div className={styles.actions}>
                  <button onClick={addPage}>
                    <MdAdd size={18} />
                  </button>
                </div>
              </header>
              <div className={styles.content_wrapper}>
                <ul className={"item_list " + styles.content}>
                  {
                    fillable.pages.map((p) => {
                      return <li key={p.key} className={styles.page_item} onClick={() => moveToPage(p.key)} data-active={activePage && activePage.key === p.key}>
                        {p.title}
                      </li>
                    })
                  }
                </ul>
              </div>
            </div>
            <div aria-expanded={compositionPanelOpen} className={cn(styles.structure, styles.structure_composition)}>
              <header data-role="header">
                <h4>Composition</h4>
                <div className={styles.actions}>
                  <button data-role="toggle" onClick={() => setCompositionPanelOpen(!compositionPanelOpen)}>
                    <MdKeyboardArrowDown size={18} />
                  </button>
                </div>
              </header>
              <div data-role="content" className={styles.content_wrapper}>
                {activePage && <ul
                  className={"item_list " + styles.content}
                  onDrop={onDropField}
                  onDragOver={onDragFieldOver}
                  onDragLeave={onDragFieldLeave}
                  onDragExit={onDragFieldExit}
                  onMouseLeave={onMouseLeaveDragZone}>
                  {
                    activePage.fields.map((f) => {
                      return <li
                        draggable
                        onDragStart={(ev) => onDragFieldStarted(ev, f)}
                        key={f.key} className={styles.field_item}
                        onClick={() => setHighlightedField(f.key)}
                        data-active={f.key === edition.activeField}
                        data-field={f.key}>
                        <div className={styles.content}>
                          <span className={styles.title}>{f.title || "Sans titre"}</span>
                          <span className={styles.type}>{names[fieldCode(f)]}</span>
                        </div>
                        <div className={styles.actions}>
                          <button onClick={() => removeField(activePage.key, f.key)}>
                            <MdClose size={18} />
                          </button>
                        </div>
                      </li>
                    })
                  }
                </ul>}
              </div>
            </div>
          </section>
          <section className={styles.base_wrapper}>
            <div className={styles.base_content}>
              <div className={styles.builder_wrapper}>
                {
                  activePage && <PageBuilder page={activePage} />
                }
              </div>
            </div>
          </section>
          <section className={styles.details_wrapper}>
            <div className={styles.tabs_details}>
              <div className={styles.tab} data-active={activeTab === "fields"} onClick={() => setActiveTab("fields")}>
                <h5>Champs</h5>
              </div>
              <div className={styles.tab} data-active={activeTab === "edition"} onClick={() => setActiveTab("edition")}>
                <h5>Edition</h5>
              </div>
              <div className={styles.tab} data-active={activeTab === "style"} onClick={() => setActiveTab("style")}>
                <h5>Style</h5>
              </div>
            </div>
            <div className={styles.tab_content}>
              {
                activeTab === "edition" &&
                <DraggableChoiceList />
              }
              {
                activeTab === "fields" &&
                <DraggableChoiceList />
              }
              {
                activeTab === "style" &&
                <DraggableChoiceList />
              }
            </div>
          </section>
        </main>
      </div>
    </Initializer>
  )
}



export function getServerSideProps() {
  let initial = initializeStore(undefined);
  return { props: { initialReduxState: initial.getState() } };
}